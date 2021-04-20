const {
    scriptStart, command, onAction,
} = require('../dist/index');

command('sonic', () => {
    onAction(async () => {
        // do nothing
    });
});

command('amy', () => {
    onAction(async () => {
        // do nothing
    });
});

command('eggman', () => {
    onAction(async () => {
        // do nothing
    });
});

command('knuckles', () => {
    onAction(async () => {
        // do nothing
    });
});

scriptStart(process.argv, 'mocked-test', 'mock', {}, '1.0');
