import { ICommandOptionValue, ActionContextCallback } from './types';
import CommandContextTree from './CommandContextTree';
import { getOptionName } from '../utils';
import { BackendAdapter } from '../backends/BackendAdapter';

export default class CommandBuilder {
    public name: string | undefined;

    private backendAdapter: BackendAdapter | null = null;

    public constructor(name: string | undefined) {
        this.name = name;
    }

    public alias(aliases: string[]) {
        CommandContextTree.getInstance().updateCommand(this.name, (c) => ({
            ...c,
            aliases,
        }));
    }

    public description(description: string) {
        CommandContextTree.getInstance().updateCommand(this.name, (c) => ({
            ...c,
            description,
        }));
    }

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

    // short flag = -f
    // long flag = --flag
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

    public onAction(cb: ActionContextCallback) {
        CommandContextTree.getInstance().updateCommand(this.name, (c) => ({
            ...c,
            onAction: cb,
        }));
    }

    public setBackendAdapter(backend: BackendAdapter) {
        this.backendAdapter = backend;
    }

    public getBackendAdapter() {
        return this.backendAdapter;
    }
}
