import * as shell from 'shelljs';
import * as chalk from 'chalk';
import * as prompts from 'prompts';
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
    ShellExecException,
    utils: {
        exec: shellExec,
        execFile: shellExecFile,
    },
    logLines,
    logWithLabel,
    getOptions,
};

export {
    ShellExecFileOptions,
    ShellExecOptions,
    shell,
    chalk,
    prompts,
};
