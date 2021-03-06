import * as childProcess from 'child_process';
import * as chalk from 'chalk';
import { get, isBoolean, isObject } from 'lodash';
import ShellExecException from './ShellExecException';
import ActionContext from '../context/ActionContext';

export interface ShellExecResult {
    stdout: string | Buffer;
    stderr: string | Buffer;
}

interface ShellExecExtendedOptions {
    log? : {
        /**
         * Show stdout on terminal default: true
         */
        stdout: boolean;
        /**
         * Show stderr on terminal default: true
         */
        stderr: boolean;
        /**
         * Show in terminal proccess start default: true
         */
        start: boolean;
        /**
         * Show in terminal process end default: true
         */
        end: boolean;
        /**
         * Show in terminal error log default: true
         */
        error: boolean;
    } | boolean;
}

export interface ShellExecOptions extends childProcess.ExecOptions, ShellExecExtendedOptions {
}

export interface ShellExecFileOptions extends childProcess.ExecFileOptions, ShellExecExtendedOptions {
}

export class ChildProccessRunner {
    public constructor(private ctx: ActionContext) {}

    /**
     * This is a simple helper thats uses child_procces.exec and do some outputs to terminal like errors succes and realtime stdout. Note: This helper is very useful when you need to run third-party tools and want to show the user the progress / monitoring of the execution.
     * @param command string
     * @param opt ScriptExecOptions
     * @returns ShellExecResult
     */
    shellExec(command: string, opt?: ShellExecOptions | null) {
        return new Promise<ShellExecResult>((resolve, reject) => {
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
                this.ctx.log(`${chalk.bgGreen.white.bold(' EXEC ')} runing command ${chalk.green(`"${command}"`)}`);
            }

            const child = childProcess.exec(command, opts, (error: childProcess.ExecException | null, stdout: string | Buffer, stderr: string | Buffer) => {
                if (error) {
                    if (get(opts, ['log', 'error'])) {
                        this.ctx.exitError(`${chalk.bgRed.white.bold(' EXEC ')} falied to execute command ${chalk.yellow(`"${command}"`)}`);
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
                        this.ctx.log(`${chalk.bgGreen.white.bold(' EXEC ')} command ${chalk.green(`"${command}"`)} executed with success`);
                    }
                }
            });

            if (child.stdout && get(opts, ['log', 'stdout']) && !this.ctx.isSilent()) {
                child.stdout.on('data', (data) => {
                    process.stdout.write(data);
                });
            }
            if (child.stderr && get(opts, ['log', 'stderr']) && !this.ctx.isSilent()) {
                child.stderr.on('data', (data) => {
                    process.stdout.write(data);
                });
            }
        });
    }

    /**
     * This is a simple helper thats uses child_procces.execFile and do some outputs to terminal like errors succes and realtime stdout. Note: This helper is very useful when you need to run third-party tools and want to show the user the progress / monitoring of the execution.
     * @param fileName string
     * @param opt ScriptExecOptions
     * @returns ShellExecResult
     */
    shellExecFile(command: string, args: ReadonlyArray<string> | undefined | null = null, opt?: ShellExecFileOptions | null) {
        return new Promise<ShellExecResult>((resolve, reject) => {
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
                this.ctx.log(`${chalk.bgGreen.white.bold(' EXEC FILE ')} runing command ${chalk.green(`"${command}"`)}`);
            }

            const child = childProcess.execFile(command, args, opts, (error: childProcess.ExecException | null, stdout: string | Buffer, stderr: string | Buffer) => {
                if (error) {
                    const outError = new ShellExecException(error.message, stdout, stderr);
                    outError.stack = error.stack;
                    reject(outError);
                    if (get(opts, ['log', 'error'])) {
                        this.ctx.log(`${chalk.bgRed.white.bold(' EXEC FILE ')} falied to execute command ${chalk.yellow(`"${command}"`)}`, false);
                    }
                } else {
                    resolve({
                        stderr,
                        stdout,
                    });

                    if (get(opts, ['log', 'end'])) {
                        this.ctx.log(`${chalk.bgGreen.white.bold(' EXEC FILE ')} command ${chalk.green(`"${command}"`)} executed with success`);
                    }
                }
            });

            if (child.stdout && get(opts, ['log', 'stdout']) && !this.ctx.isSilent()) {
                child.stdout.on('data', (data) => {
                    process.stdout.write(data);
                });
            }
            if (child.stderr && get(opts, ['log', 'stderr']) && !this.ctx.isSilent()) {
                child.stderr.on('data', (data) => {
                    process.stdout.write(data);
                });
            }
        });
    }
}
