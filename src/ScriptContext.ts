import * as commander from 'commander';
import { InternalContext, InternalContextType } from './runtime/core/internalTypes';

export default class ScriptContext {
    private static instance: ScriptContext;

    private currentContext: InternalContext;

    private currentRunningCommand: commander.Command | null = null;

    private currentOnActionCommandName: string | null = null;

    /**
     * Get ScriptContext Instance
     */
    public static getInstance(): ScriptContext {
        if (!ScriptContext.instance) {
            ScriptContext.instance = new ScriptContext();
        }

        return ScriptContext.instance;
    }

    /**
     * Constructor
     */
    public constructor() {
        commander
            .option('--silent', 'Disable log and debug information, including children proccess stdout', false);

        this.currentContext = {
            command: null,
            promiseQueue: [],
            type: null,
        };
    }

    /**
     * Get current command
     */
    public getCommand() {
        return this.currentContext?.command || null;
    }

    /**
     * Get current context type
     */
    public getContextType() {
        return this.currentContext?.type || null;
    }

    /**
     * Set Current command
     */
    public setCommand(currentCommand: commander.Command | null) {
        this.currentContext.command = currentCommand;
    }

    /**
     * Set Current Context Type
     */
    public setContextType(currentContextType: InternalContextType) {
        this.currentContext.type = currentContextType;
    }

    /**
     * Set current command promise avoiding problems with sync
     */
    public pushCommandPromise(commandPromise: ()=> Promise<void>) {
        this.currentContext.promiseQueue.push(commandPromise);
    }

    public getPromiseQueue() {
        return this.currentContext.promiseQueue;
    }

    public getContext() {
        return this.currentContext;
    }

    public getProgram() {
        return commander;
    }

    public getCurrentRunningCommand() {
        return this.currentRunningCommand;
    }

    public setCurrentCommandName(name: string | null) {
        this.currentOnActionCommandName = name;
    }

    public getCurrentCommandName() {
        return this.currentOnActionCommandName;
    }

    public setCurrentRunningCommand(currentRunningCommand: commander.Command | null) {
        this.currentRunningCommand = currentRunningCommand;
    }

    /**
     * Requires a command context and type is on action
     */
    public requiresOnActionContext(fnName: string) {
        if (this.currentContext.command && this.currentContext.type === 'command') {
        /// pass
        } else if (!this.currentContext.command) {
            throw new Error(`Invalid context, ${fnName} can only be executed within a command context.`);
        } else {
            throw new Error(`Invalid context, ${fnName} cannot be executed within an onAction context.`);
        }
    }

    /**
     * Requires command context and type is command
     */
    public requiresCommandContext(fnName: string) {
        if (this.currentContext.command && this.currentContext.type === 'command') {
        // pass
        } else if (!this.currentContext.command) {
            throw new Error(`Invalid context, ${fnName} can only be executed within a command context.`);
        } else {
            throw new Error(`Invalid context, ${fnName} cannot be executed within an onAction context.`);
        }
    }
}
