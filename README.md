# Scriptails

<img src="logo.svg" width="200">

---

Scriptails is a framework for building a command line interface(CLI) using Node.js.Scriptails makes easy to build your own CLIs for your company, servicer, project.
Yes, scriptails were created to be used both within projects and as a separate tool.

**Read Docs Here:** https://scriptails-docs.vercel.app/docs/intro

**Found an issue? submit to us https://github.com/luciancaetano/scriptails/issues**

## Why use Scriptails?
With scriptails you can easily build CLIs tools for your project, company or organization.
You might want to use Scriptails if:
- You need to build some advanced scripts to perform repetitive tasks on your project.
- You have a complex deployment process and you need to simplify this.
- You want to automate some things.

# Getting started

Install scriptails using `yarn` or `npm`:


```shell
yarn add scriptails
```
Ou
```shell
yarn add scriptails
```

#### Let's start creating our index.js and our first command.

```js title="index.js"
const { start } = require('scriptails');

require('./my-frist.command.js');


start(process.argv, {
    name: 'my-cli',
    description: 'my cli description',
    version: '1.0',
});
```
Note: In the 3rd line we import our command file, the scriptails the commands must be **imported before** the **start function**, if you import/require them later it is very likely that you will have problems running it.

Now we will declare our first command within the `my-frist.command.js` file

```js title="my-frist.command.js"
const { command } = require('scriptails');

command('first', (command) => {
    command.option(['-D', '--debug'], null, 'Set debug mode', false);
    command.onAction((ctx) => {
        const isDebug = action.getOption('debug').toBoolean();
        if(isDebug) {
            ctx.log("Debug is On");
        }
        ctx.logWithLabel("success", "Hello world, with label");
    })
});

```

Finally run your new CLI using:

```shell
node index.js first
```
