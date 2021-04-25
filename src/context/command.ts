import { CommandContextCallback } from './types';
import CommandBuilder from './CommandBuilder';
import CommandContextTree from './CommandContextTree';
import { isPresent } from '../utils';
import { CommanderJSBackend } from '../backends/CommanderJSBackend';

export async function command(name: string, cb: CommandContextCallback) {
    CommandContextTree.getInstance().addCommand({
        name,
        aliases: [],
        args: {},
        options: {},
    });
    await cb(new CommandBuilder(name));
}

export async function defaultCommand(cb: CommandContextCallback) {
    CommandContextTree.getInstance().setDefaultCommand({
        name: '_default',
        aliases: [],
        args: {},
        options: {},
    });
    await cb(new CommandBuilder(undefined));
}

export function start(argv: string[], name: string, description?: string, version?: string, useSilentOption = true) {
    if (!isPresent(name)) {
        throw new Error('Command name must be present');
    }
    CommandContextTree.getInstance().setName(name);
    CommandContextTree.getInstance().setDescription(description);
    CommandContextTree.getInstance().setVersion(version);
    CommandContextTree.getInstance().useSilent(useSilentOption);

    const defaultBackend = new CommanderJSBackend(CommandContextTree.getInstance().getStack());

    defaultBackend.run(argv);
}
