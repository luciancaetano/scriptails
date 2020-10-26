import * as commander from 'commander';
import { isArray, last } from 'lodash';
import { ScriptContextCallback, ActionContextCallback } from './runtime/core/internalTypes';
import MixedType from './runtime/core/castable/MixedType';
import ScriptContext from './ScriptContext';

export class ScriptContextError extends Error {

}

/**
 * Run scripts
 * @param arvg              string[]     process.argv
 * @param description       string
 * @param argsDescription   Object
 */
export async function runScripts(argv: string[], description?: string, argsDescription?: {[argName: string]: string}) {
    const promiseQueue = ScriptContext.getInstance().getPromiseQueue();

    // eslint-disable-next-line
    for (const promiseFn of promiseQueue) {
        await promiseFn();
    }

    const runCmd = () => new Promise<void>((resolve, reject) => {
        try {
            if (description) {
                commander
                    .parse(argv).description(description, argsDescription);
            } else {
                commander
                    .parse(argv);
            }

            resolve();
        } catch (e) {
            reject(e);
        }
    });

    await runCmd();
}

/**
 * Define option with `flags`, `description` and optional
 * coercion `fn`.
 *
 * The `flags` string should contain both the short and long flags,
 * separated by comma, a pipe or space. The following are all valid
 * all will output this way when `--help` is used.
 *
 *    "-p, --pepper"
 *    "-p|--pepper"
 *    "-p --pepper"
 *
 * @example
 *     // simple boolean defaulting to false
 *     option('-p, --pepper', 'add pepper');
 *
 *     --pepper
 *     tie.option('pepper')
 *     // => Boolean
 *
 *     // simple boolean defaulting to true
 *     option('-C, --no-cheese', 'remove cheese');
 *
 *      tie.option('cheese')
 *     // => true
 *
 *     --no-cheese
 *      tie.option('cheese')
 *     // => false
 *
 *     // required argument
 *     option('-C, --chdir <path>', 'change the working directory');
 *
 *     --chdir /tmp
 *      tie.option('chdir')
 *     // => "/tmp"
 *
 *     // optional argument
 *     option('-c, --cheese [type]', 'add cheese [marble]');
 *
 */
export function option(flags: string, description?: string, defaultValue?: string | boolean) {
    const cmd = ScriptContext.getInstance().getCommand();

    if (cmd) {
        cmd.option(flags, description, defaultValue);
    } else {
        throw new ScriptContextError('Invalid context, option can only be executed within a command context.');
    }
}

/**
 * Define a required option, which must have a value after parsing. This usually means
 * the option must be specified on the command line. (Otherwise the same as .option().)
 *
 * The `flags` string should contain both the short and long flags, separated by comma, a pipe or space.
 */
export function requiredOption(flags: string, description?: string) {
    const cmd = ScriptContext.getInstance().getCommand();

    if (cmd) {
        cmd.requiredOption(flags, description);
    } else {
        throw new ScriptContextError('Invalid context, requiredOption can only be executed within a command context.');
    }
}

/**
 * Define a command, implemented using an action handler.
 *
 * @param nameAndArgs - command name and arguments, args are  `<required>` or `[optional]` and last may also be `variadic...`
 * @returns new command
 */
export async function command(nameAndArgs: string, context: ScriptContextCallback, hidden = false) {
    ScriptContext.getInstance().pushCommandPromise(() => new Promise<void>((resolve, reject) => {
        try {
            if (ScriptContext.getInstance().getCommand()) {
                throw new ScriptContextError('Invalid commander context, you cannot declare a "command" within another.');
            } else {
                ScriptContext.getInstance().setCommand(commander.command(nameAndArgs, { hidden, isDefault: false }));
                ScriptContext.getInstance().setContextType('command');
                Promise.resolve(context()).then(() => {
                    resolve();
                    ScriptContext.getInstance().setCommand(null);
                });
            }
        } catch (e) {
            reject(e);
        }
    }));
}

/**
 * Define a command, implemented using an action handler.
 *
 * @param args - arguments, args are  `<required>` or `[optional]` and last may also be `variadic...`
 * @returns new command
 */
export async function defaultCommand(cmdArgs: string, context: ScriptContextCallback) {
    ScriptContext.getInstance().pushCommandPromise(() => new Promise<void>((resolve, reject) => {
        try {
            if (ScriptContext.getInstance().getCommand()) {
                throw new ScriptContextError('Invalid commander context, you cannot declare a "command" within another.');
            } else {
                ScriptContext.getInstance().setCommand(commander.command(cmdArgs, { hidden: false, isDefault: true }));
                ScriptContext.getInstance().setContextType('command');
                Promise.resolve(context()).then(() => {
                    resolve();
                    ScriptContext.getInstance().setCommand(null);
                });
            }
        } catch (e) {
            reject(e);
        }
    }));
}

/**
 * Set an alias for the command.
 *
 * You may call more than once to add multiple aliases. Only the first alias is shown in the auto-generated help.
 */
export function commandAlias(alias: string | string[]) {
    ScriptContext.getInstance().requiresCommandContext('commandAlias');

    const cmd = ScriptContext.getInstance().getCommand();

    if (cmd) {
        if (isArray(alias)) {
            cmd.aliases(alias);
        } else {
            cmd.alias(alias);
        }
    }
}

/**
 * Set the description.
 *
 */
export function commandDescription(str: string, argsDescription?: {[argName: string]: string}) {
    ScriptContext.getInstance().requiresCommandContext('commandAlias');

    const cmd = ScriptContext.getInstance().getCommand();

    if (cmd) {
        cmd.description(str, argsDescription);
    }
}

/**
 * Define argument syntax for command.
 *
 * Ex: arguments('<cmd> [env]')
 */
export function args(desc: string) {
    ScriptContext.getInstance().requiresCommandContext('args');

    const cmd = ScriptContext.getInstance().getCommand();

    if (cmd) {
        cmd.arguments(desc);
    }
}

/**
 * Set the command usage.
 *
 */
export function usage(text: string) {
    ScriptContext.getInstance().requiresCommandContext('args');

    const cmd = ScriptContext.getInstance().getCommand();

    if (cmd) {
        cmd.usage(text);
    }
}

/**
 * Register callback `fn` for the command.
 *
 * @example
 *      onAction(async (arg1, arg2) => {
 *           // output help here
 *      });
 */
export function onAction(callBack: ActionContextCallback) {
    ScriptContext.getInstance().requiresCommandContext('onAction');

    const cmd = ScriptContext.getInstance().getCommand();

    if (cmd) {
        cmd.action(async (...actionArgs: any[]) => {
            ScriptContext.getInstance().setCurrentRunningCommand(last(actionArgs));
            const prevContextType = ScriptContext.getInstance().getContextType();
            ScriptContext.getInstance().setContextType('command');
            await callBack(...actionArgs.slice(0, -1).map((v) => new MixedType(v)));
            ScriptContext.getInstance().setContextType(prevContextType);
            ScriptContext.getInstance().setCurrentRunningCommand(null);
        });
    }
}
