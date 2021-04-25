import { ICommandStack } from '../context/types';

export abstract class BackendAdapter {
    constructor(protected stack: ICommandStack) {}

    /**
     * Check if --silent flag is set
     */
    public abstract isSilent(): boolean ;

    /**
     * Run commandline with argv
     */
    public abstract run(argv: string[]): void;

    /**
     * Get CLI Options
     */
    public abstract getOption(name: string): string | null;

    /**
     * Get CLI Args
     * @param {string | null} commandName set null for default command
     */
    public abstract getArgs(commandName: string | null) : string[];
}
