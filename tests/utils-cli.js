const {
    start, command,
} = require('..');

command('list-files', (c) => {
    c.onAction(async (action) => {
        action.exec(`ls ${__dirname}/dir_files`);
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

start(process.argv, 'mocked-test', 'mock', '1.0');
