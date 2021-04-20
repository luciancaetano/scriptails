const {
    scriptStart, command, onAction, commandDescription,
} = require('../dist/index');

command('list-files', () => {
    commandDescription('it should list files');
    onAction(async () => {

    });
});

scriptStart(process.argv, 'mocked-test', 'mock', {}, '1.0');
