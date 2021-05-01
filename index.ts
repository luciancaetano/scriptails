import { start, command, defaultCommand } from './src';

defaultCommand((c) => {
    c.option(['--debug'], null);
    c.arg('path', true, false, 'project path');

    c.onAction((ctx) => {
        const args = ctx.getArgs().map((arg) => arg.toString());

        ctx.log({ args, options: ctx.getOptions() });
    });
});

command('build', (c) => {
    c.aliases(['b']);
    c.description('description');
    c.option(['-D', '--debug'], null, 'build debug mode', false);
    c.option(
        ['-P', '--project'],
        { title: 'projectName', required: true },
        'project name',
    );
    c.option(
        ['-P', '--platforms'],
        { title: 'platforms', variadic: true },
        'target platforms',
        'linux',
    );
    c.arg('path', true, false, 'project path');

    c.onAction((ctx) => {
        const debug = ctx.getOption('debug').toBoolean();
        const project = ctx.getOption('project').toString();
        const platforms = ctx.getOption('platforms').variadic().map((arg) => arg.toString());
        const args = ctx.getArgs().map((arg) => arg.toString());

        ctx.logWithLabel('info', {
            debug, args, project, platforms,
        });

        ctx.exitError('Error');
    });
});

start(process.argv, {
    name: 'my-cli',
});
