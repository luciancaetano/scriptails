import * as chalk from 'chalk';
import * as program from 'commander';
import * as globLib from 'glob';

export * from './program';

const { log: consoleLog } = console;

const isSilent = () => program.opts().silent;

/**
 * Type in the terminal
 * @note Do nothing if the --silent flag is present
 * @param ...args:any[]
 */
export function log(...args: any[]) {
    if (isSilent()) return;
    consoleLog(...args);
}

/**
 * Write in the terminal each element of the array on a line
 * @note Do nothing if the --silent flag is present
 * @param args:string[]
 */
export function logLines(args: string[]) {
    if (isSilent()) return;
    args.forEach((line) => consoleLog(line));
}

/**
 * Write in the terminal with a label as a prefix, this label is stylized and formatted according to its context.
 * @note Do nothing if the --silent flag is present
 * @param text string
 * @param label 'error'|'info'|'warning'|'success'
 */
export function logWithLabel(text: string, label: 'error' | 'info' | 'warning' | 'success') {
    if (isSilent()) return;

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

    consoleLog(`${currLabel} ${text}`);
}

/**
 * Check if proccess is runing on expected platform
 * @param expected expected platform 'aix' | 'darwin' | 'freebsd' | 'linux' | 'openbsd' | 'sunos' | 'win32
 */
export function isPlatform(expected: 'aix' | 'darwin' | 'freebsd' | 'linux' | 'openbsd' | 'sunos' | 'win32') {
    return process.platform === expected;
}

/**
 * Create an promisified glob see more in https://github.com/isaacs/node-glob
 */
export const glob = (pattern: string, options: globLib.IOptions) => new Promise<string[]>((resolve, reject) => {
    globLib(pattern, options, (err, files) => (err === null ? resolve(files) : reject(err)));
});
