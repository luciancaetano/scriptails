import * as childProcess from 'child_process';
import * as chalk from 'chalk';
import { get, isBoolean, isObject } from 'lodash';
import * as program from 'commander';
import { ShellExecResult } from '../types';
import { exitError, log } from '../utils';

const isSilent = () => program.opts().silent;

/**
 * Exec(File) Exception Class
 */
export class ShellExecException extends Error implements childProcess.ExecException {
    public stdout: string | Buffer;

    public stderr: string | Buffer;

    constructor(message: string, stdout: string | Buffer, stderr: string | Buffer) {
        super(message);
        this.stderr = stderr;
        this.stdout = stdout;
    }
}

interface ShellExecExtendedOptions {
    log? : {
        /**
         * Show stdout on terminal
         */
        stdout: boolean;
        /**
         * Show stderr on terminal
         */
        stderr: boolean;
        /**
         * Log proccess start
         */
        start: boolean;
        /**
         * Log process end
         */
        end: boolean;
        /**
         * Show error log
         */
        error: boolean;
    } | boolean;
}

export interface ShellExecOptions extends childProcess.ExecOptions, ShellExecExtendedOptions {
}

export interface ShellExecFileOptions extends childProcess.ExecFileOptions, ShellExecExtendedOptions {
}
/**
 * Execute an command
 * This is a simple helper runing more eazy with async functions
 * @param command string
 * @param opt ScriptExecOptions
 * @returns ShellExecResult
 */
export const shellExec = (command: string, opt?: ShellExecOptions | null) => new Promise<ShellExecResult>((resolve, reject) => {
    const opts: any = {
        ...opt || {},
    };

    if (opt?.log && isBoolean(opt.log)) {
        opts.log = {
            start: opt.log,
            end: opt.log,
            stderr: opt.log,
            stdout: opt.log,
            error: opt.log,
        };
    } else if (opt?.log && isObject(opt?.log)) {
        opts.log = {
            start: get(opts, ['log', 'start'], true),
            end: get(opts, ['log', 'end'], true),
            stderr: get(opts, ['log', 'stderr'], true),
            stdout: get(opts, ['log', 'stdout'], true),
            error: get(opts, ['log', 'error'], true),
        };
    } else {
        opts.log = {
            start: true,
            end: true,
            stderr: true,
            stdout: true,
            error: true,
        };
    }

    if (get(opts, ['log', 'start'])) {
        log(`${chalk.bgGreen.white.bold(' EXEC ')} runing command ${chalk.green(`"${command}"`)}`);
    }

    const child = childProcess.exec(command, opts, (error: childProcess.ExecException | null, stdout: string | Buffer, stderr: string | Buffer) => {
        if (error) {
            if (get(opts, ['log', 'error'])) {
                exitError(`${chalk.bgRed.white.bold(' EXEC ')} falied to execute command ${chalk.yellow(`"${command}"`)}`, false);
            }
            const outError = new ShellExecException(error.message, stdout, stderr);
            outError.stack = error.stack;
            reject(outError);
        } else {
            resolve({
                stderr,
                stdout,
            });

            if (get(opts, ['log', 'end'])) {
                log(`${chalk.bgGreen.white.bold(' EXEC ')} command ${chalk.green(`"${command}"`)} executed with success`);
            }
        }
    });

    if (child.stdout && get(opts, ['log', 'stdout']) && !isSilent()) {
        child.stdout.on('data', (data) => {
            process.stdout.write(data);
        });
    }
    if (child.stderr && get(opts, ['log', 'stderr']) && !isSilent()) {
        child.stderr.on('data', (data) => {
            process.stdout.write(data);
        });
    }
});

/**
 * Execute an file
 * This is a simple helper runing more eazy with async functions
 * @param fileName string
 * @param opt ScriptExecOptions
 * @returns ShellExecResult
 */
export const shellExecFile = (command: string, args: ReadonlyArray<string> | undefined | null = null, opt?: ShellExecFileOptions | null) => new Promise<ShellExecResult>((resolve, reject) => {
    const opts: any = {
        ...opt || {},
    };

    if (opt?.log && isBoolean(opt.log)) {
        opts.log = {
            start: opt.log,
            end: opt.log,
            stderr: opt.log,
            stdout: opt.log,
            error: opt.log,
        };
    } else if (opt?.log && isObject(opt?.log)) {
        opts.log = {
            start: get(opts, ['log', 'start'], true),
            end: get(opts, ['log', 'end'], true),
            stderr: get(opts, ['log', 'stderr'], true),
            stdout: get(opts, ['log', 'stdout'], true),
            error: get(opts, ['log', 'error'], true),
        };
    } else {
        opts.log = {
            start: true,
            end: true,
            stderr: true,
            stdout: true,
            error: true,
        };
    }

    if (get(opts, ['log', 'start'])) {
        log(`${chalk.bgGreen.white.bold(' EXEC FILE ')} runing command ${chalk.green(`"${command}"`)}`);
    }

    const child = childProcess.execFile(command, args, opts, (error: childProcess.ExecException | null, stdout: string | Buffer, stderr: string | Buffer) => {
        if (error) {
            const outError = new ShellExecException(error.message, stdout, stderr);
            outError.stack = error.stack;
            reject(outError);
            if (get(opts, ['log', 'error'])) {
                log(`${chalk.bgRed.white.bold(' EXEC FILE ')} falied to execute command ${chalk.yellow(`"${command}"`)}`, false);
            }
        } else {
            resolve({
                stderr,
                stdout,
            });

            if (get(opts, ['log', 'end'])) {
                log(`${chalk.bgGreen.white.bold(' EXEC FILE ')} command ${chalk.green(`"${command}"`)} executed with success`);
            }
        }
    });

    if (child.stdout && get(opts, ['log', 'stdout']) && !isSilent()) {
        child.stdout.on('data', (data) => {
            process.stdout.write(data);
        });
    }
    if (child.stderr && get(opts, ['log', 'stderr']) && !isSilent()) {
        child.stderr.on('data', (data) => {
            process.stdout.write(data);
        });
    }
});
