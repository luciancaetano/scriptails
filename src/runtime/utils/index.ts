import * as program from 'commander';

export * from './program';

const { log: consoleLog } = console;

const isSilent = () => program.opts().silent;

/**
 * Only print when --silent is not set to true
 */
export function log(...args: any[]) {
    if (isSilent()) return;
    consoleLog(...args);
}

/**
 * Check if proccess is runing on expected platform
 */
export function isPlatform(expected: 'aix' |'darwin' |'freebsd' |'linux' |'openbsd' |'sunos' |'win32') {
    return process.platform === expected;
}
