const {
    start, command,
} = require('..');

command('sonic', (c) => {
    c.onAction(async () => {
        // do nothing
    });
});

command('amy', (c) => {
    c.onAction(async () => {
        // do nothing
    });
});

command('eggman', (c) => {
    c.onAction(async () => {
        // do nothing
    });
});

command('knuckles', (c) => {
    c.onAction(async () => {
        // do nothing
    });
});

start(process.argv, 'mocked-test', 'mock', '1.0');
