import {
    exitError, getOption, isPlatform, log, logLines, logWithLabel, getOptions,
} from './utils';
import {
    shellExec, shellExecFile, ShellExecException, ShellExecFileOptions, ShellExecOptions, prompt,
} from './shell';

export const sm = {
    exitError,
    getOption,
    isPlatform,
    log,
    shellExec,
    shellExecFile,
    ShellExecException,
    logLines,
    logWithLabel,
    prompt,
    getOptions,
};

export {
    ShellExecFileOptions,
    ShellExecOptions,
};
