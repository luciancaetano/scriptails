### Functions

* [args](DOCUMENTATION.md#args)
* [command](DOCUMENTATION.md#command)
* [commandAlias](DOCUMENTATION.md#commandalias)
* [defaultCommand](DOCUMENTATION.md#defaultcommand)
* [onAction](DOCUMENTATION.md#onaction)
* [option](DOCUMENTATION.md#option)
* [requiredOption](DOCUMENTATION.md#requiredoption)
* [runScripts](DOCUMENTATION.md#runscripts)
* [usage](DOCUMENTATION.md#usage)

## Functions

### args

▸ **args**(`desc`: string): void

*Defined in [src/ContextFunctions.ts:186](https://github.com/luciancaetano/tie-fighter/blob/ec2c326/src/ContextFunctions.ts#L186)*

Define argument syntax for command.

Ex: arguments('<cmd> [env]')

#### Parameters:

Name | Type |
------ | ------ |
`desc` | string |

**Returns:** void

___

### command

▸ **command**(`nameAndArgs`: string, `context`: [ScriptContextCallback](_src_runtime_types_.md#scriptcontextcallback), `hidden?`: boolean): Promise\<void>

*Defined in [src/ContextFunctions.ts:107](https://github.com/luciancaetano/tie-fighter/blob/ec2c326/src/ContextFunctions.ts#L107)*

Define a command, implemented using an action handler.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`nameAndArgs` | string | - | command name and arguments, args are  `<required>` or `[optional]` and last may also be `variadic...` |
`context` | [ScriptContextCallback](_src_runtime_types_.md#scriptcontextcallback) | - | - |
`hidden` | boolean | false | - |

**Returns:** Promise\<void>

new command

___

### commandAlias

▸ **commandAlias**(`alias`: string \| string[]): void

*Defined in [src/ContextFunctions.ts:167](https://github.com/luciancaetano/tie-fighter/blob/ec2c326/src/ContextFunctions.ts#L167)*

Set an alias for the command.

You may call more than once to add multiple aliases. Only the first alias is shown in the auto-generated help.

#### Parameters:

Name | Type |
------ | ------ |
`alias` | string \| string[] |

**Returns:** void

___

### defaultCommand

▸ **defaultCommand**(`cmdArgs`: string, `context`: [ScriptContextCallback](_src_runtime_types_.md#scriptcontextcallback)): Promise\<void>

*Defined in [src/ContextFunctions.ts:138](https://github.com/luciancaetano/tie-fighter/blob/ec2c326/src/ContextFunctions.ts#L138)*

Define a command, implemented using an action handler.

#### Parameters:

Name | Type |
------ | ------ |
`cmdArgs` | string |
`context` | [ScriptContextCallback](_src_runtime_types_.md#scriptcontextcallback) |

**Returns:** Promise\<void>

new command

___

### onAction

▸ **onAction**(`callBack`: [OnActionContextCallback](_src_runtime_types_.md#onactioncontextcallback)): void

*Defined in [src/ContextFunctions.ts:218](https://github.com/luciancaetano/tie-fighter/blob/ec2c326/src/ContextFunctions.ts#L218)*

Register callback `fn` for the command.

**`example`** 
     onAction(async (arg1, arg2) => {
          // output help here
     });

#### Parameters:

Name | Type |
------ | ------ |
`callBack` | [OnActionContextCallback](_src_runtime_types_.md#onactioncontextcallback) |

**Returns:** void

___

### option

▸ **option**(`flags`: string, `description?`: undefined \| string, `defaultValue?`: string \| boolean): void

*Defined in [src/ContextFunctions.ts:75](https://github.com/luciancaetano/tie-fighter/blob/ec2c326/src/ContextFunctions.ts#L75)*

Define option with `flags`, `description` and optional
coercion `fn`.

The `flags` string should contain both the short and long flags,
separated by comma, a pipe or space. The following are all valid
all will output this way when `--help` is used.

   "-p, --pepper"
   "-p|--pepper"
   "-p --pepper"

**`example`** 
    // simple boolean defaulting to false
    option('-p, --pepper', 'add pepper');

    --pepper
    tie.option('pepper')
    // => Boolean

    // simple boolean defaulting to true
    option('-C, --no-cheese', 'remove cheese');

     tie.option('cheese')
    // => true

    --no-cheese
     tie.option('cheese')
    // => false

    // required argument
    option('-C, --chdir <path>', 'change the working directory');

    --chdir /tmp
     tie.option('chdir')
    // => "/tmp"

    // optional argument
    option('-c, --cheese [type]', 'add cheese [marble]');

#### Parameters:

Name | Type |
------ | ------ |
`flags` | string |
`description?` | undefined \| string |
`defaultValue?` | string \| boolean |

**Returns:** void

___

### requiredOption

▸ **requiredOption**(`flags`: string, `description?`: undefined \| string): void

*Defined in [src/ContextFunctions.ts:91](https://github.com/luciancaetano/tie-fighter/blob/ec2c326/src/ContextFunctions.ts#L91)*

Define a required option, which must have a value after parsing. This usually means
the option must be specified on the command line. (Otherwise the same as .option().)

The `flags` string should contain both the short and long flags, separated by comma, a pipe or space.

#### Parameters:

Name | Type |
------ | ------ |
`flags` | string |
`description?` | undefined \| string |

**Returns:** void

___

### runScripts

▸ **runScripts**(`argv`: string[]): Promise\<void>

*Defined in [src/ContextFunctions.ts:15](https://github.com/luciancaetano/tie-fighter/blob/ec2c326/src/ContextFunctions.ts#L15)*

Run scripts

#### Parameters:

Name | Type |
------ | ------ |
`argv` | string[] |

**Returns:** Promise\<void>

___

### usage

▸ **usage**(`text`: string): void

*Defined in [src/ContextFunctions.ts:200](https://github.com/luciancaetano/tie-fighter/blob/ec2c326/src/ContextFunctions.ts#L200)*

Set the command usage.

#### Parameters:

Name | Type |
------ | ------ |
`text` | string |

**Returns:** void
