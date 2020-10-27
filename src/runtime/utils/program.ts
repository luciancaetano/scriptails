import {
    filter, first, get, isError, map,
} from 'lodash';
import * as chalk from 'chalk';
import { program } from 'commander';
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
 * Get all options/flags in program
 * @returns {Object}
 */
export function getOptions() {
    const commandName = ScriptContext.getInstance().getCurrentCommandName();

    return first(filter(map(program.commands, (command) => {
        if (command.name() === commandName) {
            return command.opts();
        }
        return null;
    }), (item) => !!item)) || {};
}

/**
 * Read an option/flag in program
 * @param {string} name
 * @param {string|boolean|null} defaultValue
 */
export function getOption(name: string, defaultValue: string | boolean | null = null) {
    return new MixedType(get(getOptions(), name, defaultValue) || defaultValue);
}
