import {
    exitError, getOption, isPlatform, log, logLines, logWithLabel, getOptions,
} from './utils';
import {
    shellExec, shellExecFile, ShellExecException, ShellExecFileOptions, ShellExecOptions,
} from './shell';

export const tails = {
    exitError,
    getOption,
    isPlatform,
    log,
    shellExec,
    shellExecFile,
    ShellExecException,
    logLines,
    logWithLabel,
    getOptions,
};

export {
    ShellExecFileOptions,
    ShellExecOptions,
};
