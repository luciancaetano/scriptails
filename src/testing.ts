import { command, defaultCommand, start } from './index';

defaultCommand((c) => {
    c.description('description');
    c.option(['-D', '--debug'], null, 'build debug mode', false);
    c.option(['-P', '--project'], { title: 'projectName', required: true }, 'project name');
    c.option(['-P', '--platforms'], { title: 'platforms', variadic: true }, 'target platforms', 'windows');
    c.arg('anyArg', false, false, 'description');

    c.onAction((action) => {
        const debug = action.getOption('debug').toBoolean();
        const myArgs = action.getArgs()[0].toString();

        action.logWithLabel('info', debug, myArgs);

        action.exitError('Error');
    });
});

command('build', (c) => {
    c.aliases(['b']);
    c.description('description');
    c.option(['-D', '--debug'], null, 'build debug mode', false);
    c.option(['-P', '--project'], { title: 'projectName', required: true }, 'project name');
    c.option(['-P', '--platforms'], { title: 'platforms', variadic: true }, 'target platforms', 'windows');
    c.arg('anyArg', false, false, 'description');

    c.onAction((action) => {
        const debug = action.getOption('debug').toBoolean();
        const myArgs = action.getArgs()[0].toString();

        action.logWithLabel('info', { debug, myArgs });

        action.exitError('Error');
    });
});

start(process.argv, 'my-cli', 'my cli description', '1.0.1');
