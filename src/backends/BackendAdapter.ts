import { ICommandStack } from '../context/types';

export type GetOptionFn = (name: string) => string;
export type GetArgsFn = (commandName: string | null) => string[];

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
}
