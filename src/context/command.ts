import { CommandContextCallback } from './types';
import CommandContext from './CommandContext';
import CommandInstanceHandler from './CommandInstanceHandler';
import { isPresent } from '../utils';
import { InternalBackend } from '../backends/InternalBackend';

export async function command(name: string, cb: CommandContextCallback) {
    CommandInstanceHandler.getInstance().addCommand({
        name,
        aliases: [],
        args: {},
        options: {},
    });
    await cb(new CommandContext(name));
}

export async function defaultCommand(cb: CommandContextCallback) {
    CommandInstanceHandler.getInstance().setDefaultCommand({
        name: '_default',
        aliases: [],
        args: {},
        options: {},
    });
    await cb(new CommandContext(undefined));
}

export interface IStartOptions {
    name: string;
    description?: string;
    version?: string;
    useSilentOption?: boolean;
}

export function start(argv: string[], options: IStartOptions) {
    const optionsSettings: IStartOptions = {
        useSilentOption: true,
        ...options,
    };
    if (!isPresent(optionsSettings.name)) {
        throw new Error('Command name must be present');
    }
    CommandInstanceHandler.getInstance().setName(optionsSettings.name);
    CommandInstanceHandler.getInstance().setDescription(optionsSettings.description);
    CommandInstanceHandler.getInstance().setVersion(optionsSettings.version);
    CommandInstanceHandler.getInstance().useSilent(optionsSettings.useSilentOption);

    const defaultBackend = new InternalBackend(CommandInstanceHandler.getInstance().getStack());

    CommandInstanceHandler.getInstance().setBackendAdapter(defaultBackend);

    defaultBackend.run(argv);
}
