import { get } from 'lodash';
import * as chalk from 'chalk';
import ScriptContext from '../../ScriptContext';
import MixedType from '../core/castable/MixedType';

const { log: consoleLog } = console;

/**
 * Print an error and exit
 */
export function exitError(message: string | Error, label = true) {
    consoleLog(`${label ? `${chalk.bgRed.white.bold(' ERROR ')}${chalk.red.bold(':')} ` : ''}${chalk.red.bold(message)}`);
    process.exit(1);
}

/**
 * Read an option in program
 */
export function getOption(name: string, defaultValue: string | boolean | null = null) {
    return new MixedType(get(ScriptContext.getInstance().getCurrentRunningCommand(), name, defaultValue) || defaultValue);
}
