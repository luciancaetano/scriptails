import {
    exitError, getOption, isPlatform, log,
} from './utils';
import {
    shellExec, shellExecFile, ShellExecException, ShellExecFileOptions, ShellExecOptions,
} from './shell';

export const sm = {
    exitError,
    getOption,
    isPlatform,
    log,
    shellExec,
    shellExecFile,
    ShellExecException,
};

export {
    ShellExecFileOptions,
    ShellExecOptions,
};
