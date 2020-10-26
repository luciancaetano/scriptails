# Scriptmizer

**Attention: This is a package under development, some bugs can be found**
**This is a Working in Progress Project**

Scriptmizer is a Simple script toolkit build on top of [commander.js](https://github.com/tj/commander.js) presenting a simple to use and practical api.

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
    import { runScripts } from 'scriptmizer';
    // Import scripts here
    import './simpleLS';

    // You must import the scripts before call runScripts
    runScripts(process.argv);
```

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

## Recommended libraries

- **Inquirer.js**: A collection of common interactive command line user interfaces.
- **shelljs**: ShellJS is a portable (Windows/Linux/OS X) implementation of Unix shell commands on top of the Node.js API.
- **cli-table**: Pretty unicode tables for the CLI with Node.JS.
- **chalk**: Terminal string styling done right.
- **figlet.js**: A FIG Driver written in JavaScript which aims to fully implement the FIGfont spec.