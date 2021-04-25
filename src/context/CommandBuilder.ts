import { ICommandOptionValue, ActionContextCallback } from './types';
import CommandContextTree from './CommandContextTree';
import { getOptionName } from '../utils';

export default class CommandBuilder {
    public name: string | undefined;

    public constructor(name: string | undefined) {
        this.name = name;
    }

    /**
     * Set aliases for command
     *
     * Only the first alias is shown in the auto-generated help.
     *
     * @param {string[]} aliases
     */

    public aliases(aliases: string[]) {
        CommandContextTree.getInstance().updateCommand(this.name, (c) => ({
            ...c,
            aliases,
        }));
    }

    /**
     * Set the command description.
     *
     * @param {string} description
     */
    public description(description: string) {
        CommandContextTree.getInstance().updateCommand(this.name, (c) => ({
            ...c,
            description,
        }));
    }

    /**
     * Define an argument command.
     *
     * Ex: command.arg('<cmd> [env]')
     *
     * @param {string} name argument name
     */
    public arg(name: string, required?: boolean, variadic?: boolean, description?: string) {
        CommandContextTree.getInstance().updateCommand(this.name, (c) => ({
            ...c,
            args: {
                ...c.args,
                [name]: {
                    name,
                    required,
                    variadic,
                    description,
                },
            },
        }));
    }

    /**
     * Define command option like --debug, -d
     */
    public option(flags: string[], argument: ICommandOptionValue | null, description?: string, defaultValue?: string | boolean) {
        const optionName = getOptionName(flags);
        CommandContextTree.getInstance().updateCommand(this.name, (c) => ({
            ...c,
            options: {
                ...c.options,
                [optionName]: {
                    flags,
                    defaultValue,
                    description,
                    argument,
                },
            },
        }));
    }

    /**
     * Manually assign a usage to the command
     *
     * @param text string
     */
    public usage(usage: string) {
        CommandContextTree.getInstance().updateCommand(this.name, (c) => ({
            ...c,
            usage,
        }));
    }

    /**
     * Register callback `fn` for the command.
     *
     * @example
     *      command.onAction(async (ctx) => {
     *           // output help here
     *      });
     * @param callBack ActionContextCallback
     */
    public onAction(cb: ActionContextCallback) {
        CommandContextTree.getInstance().updateCommand(this.name, (c) => ({
            ...c,
            onAction: cb,
        }));
    }

    /**
     * Get command name
     * @summary Internal and doc usage
     */
    public getName(): string | 'default' {
        return this.name || 'default';
    }
}
