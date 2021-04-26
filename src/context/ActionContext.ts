import * as chalk from 'chalk';
import * as globLib from 'glob';
import { isError } from 'lodash/fp';
import MixedType from '../mixed/MixedType';
import { ChildProccessRunner } from '../runtime/childProcess';
import CommandInstanceHandler from './CommandInstanceHandler';
import { GetArgsFn, GetOptionFn } from '../backends/BackendAdapter';

const { log: consoleLog } = console;

export default class ActionContext {
    public childProcces = new ChildProccessRunner(this);

    public constructor(private commandName: string | null, private getOptionFn: GetOptionFn, private getArgsFn: GetArgsFn) {}

    /**
     * This member finds and returns current command option.
     * @param name
     */
    public getOption(name: string) {
        return new MixedType(this.getOptionFn(name));
    }

    /**
     * This member returns current command arguments.
     * @return {MixedType[]}
     */
    public getArgs(): MixedType[] {
        return this.getArgsFn(this.commandName).map((arg) => new MixedType(arg)) || [];
    }

    /**
     * This member print's an error and exit with specified code.
     * @param error
     * @param exitCode
     * @param label
     */
    public exitError(error: string | Error, exitCode = 1, label = true) {
        consoleLog(`${label ? `${chalk.bgRed.white.bold(' ERROR ')}${chalk.red.bold(':')} ` : ''}${chalk.red.bold(isError(error) ? error.message : error)}`);
        process.exit(exitCode);
    }

    /**
     * Create an MixedType content from string
     * @param {string} value
     */
    public toMixed(value: string) {
        return new MixedType(value);
    }

    /**
     * Check if proccess is runing on expected platform
     * @param {'aix' | 'darwin' | 'freebsd' | 'linux' | 'openbsd' | 'sunos' | 'win32} expected expected platform
     */
    public isPlatform(expected: 'aix' | 'darwin' | 'freebsd' | 'linux' | 'openbsd' | 'sunos' | 'win32') {
        return process.platform === expected;
    }

    /**
     * Write a message in the terminal, a wrapper for console.log
     * @note cant run when the --silent flag is set to true
     * @param args
     */
    public log(...args: any[]) {
        if (this.isSilent()) return;
        consoleLog(...args);
    }

    /**
     * Write in the terminal each element of the array on a line.
     * @note cant run when the --silent flag is set to true
     * @param {string[]} lines
     */
    public logLines(lines: string[]) {
        if (this.isSilent()) return;
        lines.forEach((line) => consoleLog(line));
    }

    /**
     * Write in the terminal with a label as a prefix, this label is stylized and formatted according to its context.
     * @note cant run when the --silent flag is set to true
     * @param label
     * @param args
     */
    public logWithLabel(label: 'error' | 'info' | 'warning' | 'success', ...args: any[]) {
        if (this.isSilent()) return;

        let currLabel = '';

        switch (label) {
        case 'error':
            currLabel = chalk.bgRed.white.bold(' ERROR ');
            break;

        case 'info':
            currLabel = chalk.bgBlue.white.bold(' INFO ');
            break;

        case 'warning':
            currLabel = chalk.bgYellow.white.bold(' WARNIGN ');
            break;

        case 'success':
            currLabel = chalk.bgGreen.white.bold(' SUCCESS ');
            break;
        default:
            currLabel = '';
            break;
        }

        consoleLog(`${currLabel} `, ...args);
    }

    /**
     * Create an promisified glob see more in https://github.com/isaacs/node-glob
     * @param {string} pattern
     * @param {globLib.IOptions} options
     */
    public glob(pattern: string, options: globLib.IOptions) {
        return new Promise<string[]>((resolve, reject) => {
            globLib(pattern, options, (err, files) => (err === null ? resolve(files) : reject(err)));
        });
    }

    /**
     * Check if CLI is running on silent mode
     * @returns {boolean}
     */
    public isSilent(): boolean {
        return !!CommandInstanceHandler.getInstance().getBackendAdapter()?.isSilent() || CommandInstanceHandler.getInstance().isForcedSilent();
    }

    /**
     * Artificially activates silent mode
     * @param {boolean} silent
     */
    public setSilent(silent: boolean) {
        CommandInstanceHandler.getInstance().setForcedSilent(silent);
    }
}
