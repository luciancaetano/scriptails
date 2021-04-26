import * as program from 'commander';
import { forEach, get, map } from 'lodash';
import ActionContext from '../context/ActionContext';
import { ICommand, ICommandArg, ICommandStack } from '../context/types';
import { BackendAdapter } from './BackendAdapter';

export class CommanderJSBackend extends BackendAdapter {
    private commands: Record<string, program.Command> = {};

    private defaultCommand: program.Command | null = null;

    private defaultCommandArgsDescription: any = {};

    private argsDescriptions: Record<string, any> = {};

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
        if (this.stack.defaultCommand) {
            this.defaultCommand = this.buildCommand(this.stack.defaultCommand, true);
            this.defaultCommand?.action(this.buildAction(this.stack.defaultCommand));
        }

        forEach(this.stack.commands, (command) => {
            this.commands[command.name] = this.buildCommand(command);
            this.commands[command.name].action(this.buildAction(command));
        });
    }

    private buildCommand(command: ICommand, isDefault = false): program.Command {
        const commandName = isDefault
            ? this.buildArgs(command.args, command.name, isDefault)
            : `${command.name} ${this.buildArgs(command.args, command.name, isDefault)}`;

        const cmd = program.command(commandName, { isDefault });

        if (command.description) {
            cmd.description(command.description, isDefault ? this.defaultCommandArgsDescription : this.argsDescriptions[command.name]);
        }

        if (command.aliases.length > 0) {
            cmd.aliases(command.aliases);
        }

        if (command.usage && String(command.usage).trim().length > 0) {
            cmd.usage(command.usage);
        }

        forEach(command.options, (option) => {
            if (option.argument && option.argument.required) {
                let argument = option.argument.title;

                if (option.argument.variadic) {
                    argument = `<${argument}...>`;
                } else {
                    argument = `[${argument}...]`;
                }

                cmd.requiredOption(`${option.flags.join(', ')} ${argument}`, option.description, option.defaultValue);
            } else if (option.argument && !option.argument.required) {
                let argument = option.argument.title;

                if (option.argument.variadic) {
                    argument = `[${argument}...]`;
                } else {
                    argument = `[${argument}...]`;
                }

                cmd.option(`${option.flags.join(', ')} ${argument}`, option.description, option.defaultValue);
            } else {
                cmd.option(`${option.flags.join(', ')}`, option.description, option.defaultValue);
            }
        });

        return cmd;
    }

    private buildArgs(argmunets: Record<string, ICommandArg>, commandName: string, isDefault = false) {
        return map(argmunets, (argument) => {
            let arg = argument.name;

            if (argument.variadic) {
                arg = `${arg}...`;
            }

            if (argument.required) {
                arg = `<${arg}>`;
            } else {
                arg = `[${arg}]`;
            }

            if (argument.description) {
                if (isDefault) {
                    this.defaultCommandArgsDescription[argument.name] = argument.description;
                } else {
                    if (!this.argsDescriptions[commandName]) {
                        this.argsDescriptions[commandName] = {};
                    }
                    this.argsDescriptions[commandName][argument.name] = argument.description;
                }
            }

            return arg;
        }).join(' ');
    }

    private buildAction = (command: ICommand) => async (...args: string[]) => {
        const cmd = this.commands[command.name];
        const getArgs = () => args;
        const options = cmd.opts();
        const getOption = (name: string) => get(options, name, null);
        const actionCtx = new ActionContext(command.name, getOption, getArgs, () => cmd.opts());

        if (command.onAction) {
            await command.onAction(actionCtx);
        }
    }
}
