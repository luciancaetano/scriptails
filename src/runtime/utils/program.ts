import { get, isError } from 'lodash';
import * as chalk from 'chalk';
import ScriptContext from '../../ScriptContext';
import MixedType from '../core/castable/MixedType';

const { log: consoleLog } = console;

/**
 * Print an error and exit
 *
 * @param {string|Error} message
 * @param {boolean} label
 */
export function exitError(message: string | Error, label = true) {
    consoleLog(`${label ? `${chalk.bgRed.white.bold(' ERROR ')}${chalk.red.bold(':')} ` : ''}${chalk.red.bold(isError(message) ? message.message : message)}`);
    process.exit(1);
}

/**
 * Read an option/flag in program
 * @param {string} name
 * @param {string|boolean|null} defaultValue
 */
export function getOption(name: string, defaultValue: string | boolean | null = null) {
    return new MixedType(get(ScriptContext.getInstance().getCurrentRunningCommand()?.opts(), name, defaultValue) || defaultValue);
}

/**
 * Get all options/flags in program
 * @returns {Object}
 */
export function getOptions() {
    return ScriptContext.getInstance().getCurrentRunningCommand()?.opts();
}
