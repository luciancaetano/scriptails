const {
    scriptStart, command, onAction, option, tails,
} = require('..');

command('log-label', () => {
    option('--input <input>', 'input text', '');
    onAction(async () => {
        tails.logWithLabel(tails.getOption('input').toString());
    });
});

command('log-text', () => {
    option('--input <input>', 'input text', '');
    onAction(async () => {
        tails.log(tails.getOption('input').toString());
    });
});

command('log-lines', () => {
    option('--input <input>', 'input text', '');
    onAction(async () => {
        tails.logLines([tails.getOption('input').toString()]);
    });
});

scriptStart(process.argv, 'mocked-test', 'mock', {}, '1.0');
