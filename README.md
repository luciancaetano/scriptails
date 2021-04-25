# Scriptails


![preview](https://media.giphy.com/media/L0SKuIdItTmOOiTlwg/giphy.gif "Prewview")

**Attention: This is a package under development, some bugs can be found**

Scriptails is a Simple script toolkit build on top of [commander.js](https://github.com/tj/commander.js) presenting a simple to use and practical api.

**This project is under development and you may found bugs please report them to https://github.com/luciancaetano/scriptails/issues**

## Why use Scriptails?
You might want to use Scriptails if:
- You need to build some advanced scripts to perform repetitive tasks on your project.
- You have a complex deployment process and you need to simplify this.
- You want to automate some things.

## Quick Start
    npm i -D scriptails
    or
    yarn add scriptails

Create a script folder (choose the name you want) and put an index(.ts or .js) file.

```javascript
    import { initalize } from 'scriptails';
    // Import scripts here
    import './my-command';

    // You must import the scripts before call initalize
    initalize(process.argv);
```

### Link scripts (Generate ".bin")
Npm can link your binaries declared in `package.json` in bin attr,
you can provide a custom command name and a path to your initalize file **(the file that runs initalize)**
```json
    ....
    "bin": {
        "your-awesome-script-name": "./scripts/index.ts"
    },
  ...
```

If your code is in **javascript** you just add `"#!/usr/bin/env node"` at start of your initalize file or `"#!/usr/bin/env ts-node-script"` if is typescript and install ts-node and typescript in your project.


## Scripts
The structure of the scripts was inspired by the unit testing framework like mocha, see an example below

```javascript
import {
    command, option, onAction, tails, utils,
} from 'scriptails';
command('build <platform>', () => {
    option('--debug', 'Build debug apk', false);

    onAction(async (platform) => {
        const debug = tails.getOption('debug');

        if (platform.toString() === 'android') {
            if (debug) {
                await utils.shellExec('./android/gradlew assembleDebug');
                tails.log('Build Success');
            } else {
                await utils.shellExec('./android/gradlew assembleRelease');
                tails.log('Build Success');
            }
        } else {
            tails.exitError('Only android platform is supported now');
        }
    });
});
```

### Pure Javascript
You can use pure javascript projects.
```javascript
const {
    initalize, command, option, tails, utils, onAction,
} = require('scriptails');

command('build', () => {
    option('--debug', 'debug', false);
    onAction(async () => {
        const debug = tails.getOption('debug').toBoolean() ? 'true' : false;

        utils.shellExec(`echo ${debug}`);
    });
});

initalize(process.argv, 'simples-script');
```

## Recommended libraries

- **Inquirer.js**: A collection of common interactive command line user interfaces.
- **cli-table**: Pretty unicode tables for the CLI with Node.JS.
- **figlet.js**: A FIG Driver written in JavaScript which aims to fully implement the FIGfont spec.
