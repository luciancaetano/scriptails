import ActionContext from './ActionContext';
import CommandBuilder from './CommandBuilder';

export type CommandContextCallback = ((builder: CommandBuilder) => void) | ((builder: CommandBuilder) => Promise<void>);
export type ActionContextCallback = ((context: ActionContext) => void) | ((context: ActionContext) => Promise<void>);

export interface ICommandArg {
    name: string;
    variadic?: boolean; // <arg...> | [arg...]
    required?: boolean; // required: [arg] | optional: <arg>
    description?: string;
}

export interface ICommandOptionValue {
    title: string;
    variadic?: boolean; // <arg...> | [arg...]
    required?: boolean; // required: [arg] | optional: <arg>
}

export interface ICommandOption {
    flags: string[];
    argument?: ICommandOptionValue | null;
    description?: string;
    defaultValue?: string | boolean;
}

export interface ICommand {
    name: string;
    aliases: string[];
    args: Record<string, ICommandArg>;
    options: Record<string, ICommandOption>;
    description?: string;
    usage?: string;
    onAction?: ActionContextCallback;
}

export interface ICommandStack {
    name: string;
    version?: string | undefined;
    description?: string | undefined;
    commands: Record<string, ICommand>;
    useSilent?: boolean;
    defaultCommand?: ICommand;
}
