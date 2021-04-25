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
}
