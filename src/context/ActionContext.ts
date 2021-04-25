import * as chalk from 'chalk';
import { isError } from 'lodash/fp';
import MixedType from '../mixed/MixedType';

const { log: consoleLog } = console;

export default class ActionContext {
    public getOption(name: string) {
        return new MixedType(`${name}:testing`);
    }

    public getArgs(): MixedType[] {
        return [];
    }

    public exitError(error: string | Error, exitCode = 1, label = true) {
        consoleLog(`${label ? `${chalk.bgRed.white.bold(' ERROR ')}${chalk.red.bold(':')} ` : ''}${chalk.red.bold(isError(error) ? error.message : error)}`);
        process.exit(exitCode);
    }
}
