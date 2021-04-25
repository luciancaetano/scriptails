const {
    start, command,
} = require('..');

command('list-files', (c) => {
    c.onAction(async (action) => {
        action.childProcces.shellExec(`ls ${__dirname}/dir_files`);
    });
});

command('required-args <requiredArg>', (c) => {
    c.onAction(async () => {
        // do nothing
    });
});

command('random-options', (c) => {
    c.option(['--opt'], { title: 'opt' }, 'option input', null);
    c.onAction(async (action) => {
        action.log(action.getOption('opt').toString());
    });
});

start(process.argv, {
    name: 'mocked-test',
    description: 'cli description',
    version: '1.0',
});
