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

export interface IStartOptions {
    name: string;
    description?: string;
    version?: string;
    useSilentOption?: boolean;
    templatesPath?: string;
    customTemplateEngine?: (template: string, params: any) => string;
}

export function start(argv: string[], options: IStartOptions) {
    const optionsSettings: IStartOptions = {
        useSilentOption: true,
        ...options,
    };
    if (!isPresent(optionsSettings.name)) {
        throw new Error('Command name must be present');
    }
    CommandContextTree.getInstance().setName(optionsSettings.name);
    CommandContextTree.getInstance().setDescription(optionsSettings.description);
    CommandContextTree.getInstance().setVersion(optionsSettings.version);
    CommandContextTree.getInstance().useSilent(optionsSettings.useSilentOption);
    CommandContextTree.getInstance().setTemplatesPath(optionsSettings.templatesPath || 'templates');

    if (optionsSettings.customTemplateEngine) {
        CommandContextTree.getInstance().setcustomTemplateEngine(optionsSettings.customTemplateEngine);
    }

    const defaultBackend = new CommanderJSBackend(CommandContextTree.getInstance().getStack());

    CommandContextTree.getInstance().setBackendAdapter(defaultBackend);

    defaultBackend.run(argv);
}
