# Scriptmizer


![preview](https://media.giphy.com/media/L0SKuIdItTmOOiTlwg/giphy.gif "Prewview")

**Attention: This is a package under development, some bugs can be found**

Scriptmizer is a Simple script toolkit build on top of [commander.js](https://github.com/tj/commander.js) presenting a simple to use and practical api.

**This project is under development and you may found bugs please report them to https://github.com/luciancaetano/scriptmizer/issues**

## Why use Scriptmizer?
You might want to use Scriptmizer if:
- You need to build some advanced scripts to perform repetitive tasks on your project.
- You have a complex deployment process and you need to simplify this.
- You want to automate some things.

## Quick Start
    npm i -D scriptmizer
    or
    yarn add scriptmizer

Create a script folder (choose the name you want) and put an index(.ts or .js) file.

```javascript
    import { scriptmizerStart } from 'scriptmizer';
    // Import scripts here
    import './my-command';

    // You must import the scripts before call scriptmizerStart
    scriptmizerStart(process.argv);
```

### Link scripts (Generate ".bin")
Npm can link your binaries declared in `package.json` in bin attr,
you can provide a custom command name and a path to your scriptStart file **(the file that runs scriptmizerStart)**
```json
    ....
    "bin": {
        "your-awesome-script-name": "./scripts/index.ts"
    },
  ...
```

If your code is in **javascript** you just add `"#!/usr/bin/env node"` at start of your scriptStart file or `"#!/usr/bin/env ts-node-script"` if is typescript and install ts-node and typescript in your project.


## Scripts
The structure of the scripts was inspired by the unit testing framework like mocha, see an example below

```javascript
import {
    command, option, onAction, sm,
} from 'scriptmizer';
command('build <platform>', () => {
    option('--debug', 'Build debug apk', false);

    onAction(async (platform) => {
        const debug = sm.getOption('debug');

        if (platform.toString() === 'android') {
            if (debug) {
                await sm.shellExec('./android/gradlew assembleDebug');
                sm.log('Build Success');
            } else {
                await sm.shellExec('./android/gradlew assembleRelease');
                sm.log('Build Success');
            }
        } else {
            sm.exitError('Only android platform is supported now');
        }
    });
});
```

### Pure Javascript
You can use pure javascript projects.
```javascript
const {
    scriptmizerStart, command, option, sm, onAction,
} = require('scriptmizer');

command('build', () => {
    option('--debug', 'debug', false);
    onAction(async () => {
        const debug = sm.getOption('debug').toBoolean() ? 'true' : false;

        sm.shellExec(`echo ${debug}`);
    });
});

scriptmizerStart(process.argv, 'simples-script');
```

## Demonstrations
You can see more demonstrations and examples in https://github.com/luciancaetano/scriptmizer-examples

## Recommended libraries

- **Inquirer.js**: A collection of common interactive command line user interfaces.
- **shelljs**: ShellJS is a portable (Windows/Linux/OS X) implementation of Unix shell commands on top of the Node.js API.
- **cli-table**: Pretty unicode tables for the CLI with Node.JS.
- **chalk**: Terminal string styling done right.
- **figlet.js**: A FIG Driver written in JavaScript which aims to fully implement the FIGfont spec.
- **prompts**: Lightweight, beautiful and user-friendly interactive prompts
