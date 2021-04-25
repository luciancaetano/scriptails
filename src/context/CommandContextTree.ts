import { ICommandStack, ICommand } from './types';

export default class CommandContextTree {
    private static instance: CommandContextTree;

    private stack: ICommandStack;

    /**
     * Get CommandContextTree Instance
     */
    public static getInstance(): CommandContextTree {
        if (!CommandContextTree.instance) {
            CommandContextTree.instance = new CommandContextTree();
        }

        return CommandContextTree.instance;
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
}
