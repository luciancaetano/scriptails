import { BackendAdapter } from '../backends/BackendAdapter';
import { ICommandStack, ICommand } from './types';

export default class CommandInstanceHandler {
    private static instance: CommandInstanceHandler;

    private backendAdapter: BackendAdapter | null = null;

    private stack: ICommandStack;

    private forcedSilent = false;

    /**
     * Get CommandInstanceHandler Instance
     */
    public static getInstance(): CommandInstanceHandler {
        if (!CommandInstanceHandler.instance) {
            CommandInstanceHandler.instance = new CommandInstanceHandler();
        }

        return CommandInstanceHandler.instance;
    }

    public constructor() {
        this.stack = {
            commands: {},
            name: '',
        };
    }

    public setName(name: string) {
        this.stack.name = name;
    }

    public setDescription(description: string | undefined) {
        this.stack.description = description;
    }

    public setVersion(version: string | undefined) {
        this.stack.version = version;
    }

    public useSilent(silent = true) {
        this.stack.useSilent = silent;
    }

    public addCommand(command: ICommand) {
        this.stack.commands[command.name] = command;
    }

    public setDefaultCommand(command: ICommand) {
        this.stack.defaultCommand = command;
    }

    public updateCommand(name:string| undefined, cb: (c: ICommand) => ICommand) {
        if (!name && this.stack.defaultCommand) {
            this.stack.defaultCommand = cb(this.stack.defaultCommand);
        } else if (name) {
            this.stack.commands[name] = cb(this.stack.commands[name]);
        } else {
            throw new Error('Internal error, default command not set, report this to issues');
        }
    }

    public getStack() {
        return this.stack;
    }

    public setBackendAdapter(backend: BackendAdapter) {
        this.backendAdapter = backend;
    }

    public getBackendAdapter() {
        return this.backendAdapter;
    }

    public setForcedSilent(silent: boolean) {
        this.forcedSilent = silent;
    }

    public isForcedSilent() {
        return this.forcedSilent;
    }
}
