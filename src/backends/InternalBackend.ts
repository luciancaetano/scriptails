// import { forEach, get, map } from 'lodash';
// import ActionContext from '../context/ActionContext';
import { first } from 'lodash';
import * as types from '../context/types';
import { BackendAdapter } from './BackendAdapter';
import * as utils from './utils';

export class InternalBackend extends BackendAdapter {
    private defaultCommandArgsDescription: any = {};

    private argsDescriptions: Record<string, any> = {};

    constructor(stack: types.ICommandSchema) {
        super(stack);
    }

    isSilent() {
        return false;
    }

    run(argv: string[]) {
        const args = utils.hideProcessArgvBinary(argv);
        const binary = utils.getProcessArgvBinary(argv);

        if (this.isDefaultCommand(args)) {

        }

        console.info(JSON.stringify(this.stack, null, '\t'));
    }

    isDefaultCommand(args: string[]) {
        if (args.length === 0) {
            return true;
        }

        if (!utils.isOption(first(args))) {

        }
    }
}
