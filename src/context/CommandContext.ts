import { ICommandOptionValue, ActionContextCallback } from './types';
import CommandInstanceHandler from './CommandInstanceHandler';
import { getOptionName } from '../utils';

export default class CommandContext {
    public name: string | undefined;

    public constructor(name: string | undefined) {
        this.name = name;
    }

    /**
     * This member allows you to define some aliases for the command that owns the context.
     *
     * @param {string[]} aliases
     */
    public aliases(aliases: string[]) {
        CommandInstanceHandler.getInstance().updateCommand(this.name, (c) => ({
            ...c,
            aliases,
        }));
    }

    /**
     * This member assigns a description to the command that owns the context.
     *
     * @param {string} description
     */
    public description(description: string) {
        CommandInstanceHandler.getInstance().updateCommand(this.name, (c) => ({
            ...c,
            description,
        }));
    }

    /**
     * This member define arguments for the command that owns the context.
     *
     * Ex: command.arg('<cmd> [env]')
     *
     * @param {string} name argument name
     */
    public arg(name: string, required?: boolean, variadic?: boolean, description?: string) {
        CommandInstanceHandler.getInstance().updateCommand(this.name, (c) => ({
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
     * This member allows definit options / flags to the command owner of the context.
     */
    public option(flags: string[], argument: ICommandOptionValue | null, description?: string, defaultValue?: string | boolean) {
        const optionName = getOptionName(flags);
        CommandInstanceHandler.getInstance().updateCommand(this.name, (c) => ({
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
     * This member allows you to define a usage manually for the command that owns the context.
     *
     * @param text string
     */
    public usage(usage: string) {
        CommandInstanceHandler.getInstance().updateCommand(this.name, (c) => ({
            ...c,
            usage,
        }));
    }

    /**
     * This member allows defining a function to be executed when the command is
     * invoked by the command line, note that this callback receives the context Action Context.
     *
     * @example
     *      command.onAction(async (ctx) => {
     *           // output help here
     *      });
     * @param callBack ActionContextCallback
     */
    public onAction(cb: ActionContextCallback) {
        CommandInstanceHandler.getInstance().updateCommand(this.name, (c) => ({
            ...c,
            onAction: cb,
        }));
    }

    /**
     * This function returns the name of the command ateo (for documentation purposes and consumption of the internal api).
     * @summary Internal and doc usage
     */
    public getName(): string | 'default' {
        return this.name || 'default';
    }
}
