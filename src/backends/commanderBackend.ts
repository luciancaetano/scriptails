import * as program from 'commander';
import { ICommandStack } from '../context/types';
import { BackendAdapter } from './BackendAdapter';

export class CommanderJSBackend extends BackendAdapter {
    constructor(stack: ICommandStack) {
        super(stack);
        program.name(stack.name);

        if (stack.description) {
            program.description(stack.description);
        }

        if (stack.version) {
            program.version(stack.version);
        }

        if (stack.useSilent) {
            program.option('--silent', 'Disable log and debug information, including children proccess stdout', false);
        }

        this.prebuild();
    }

    isSilent() {
        return program.opts().silent;
    }

    run(argv: string[]) {
        program.parse(argv);
    }

    private prebuild() {
        //

        console.log(JSON.stringify(this.stack, null, '\t'));
    }
}
