const {
    start, command,
} = require('..');

command('log-label', (c) => {
    c.option(['--input'], { title: 'input' }, 'input text', '');
    c.onAction(async (action) => {
        action.logWithLabel(action.getOption('input').toString());
    });
});

command('log-text', (c) => {
    c.option(['--input'], { title: 'input' }, 'input text', '');
    c.onAction(async (action) => {
        action.log(action.getOption('input').toString());
    });
});

command('log-lines', (c) => {
    c.option(['--input'], { title: 'input' }, 'input text', '');
    c.onAction(async (action) => {
        action.logLines([action.getOption('input').toString()]);
    });
});

start(process.argv, {
    name: 'mocked-test',
    description: 'cli description',
    version: '1.0',
});
