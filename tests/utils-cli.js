/// <reference path="../types.d.ts" />
const fs = require('fs');

const {
    initalize, command, onAction, utils, option, tails,
} = require('..');

command('list-files', () => {
    onAction(async () => {
        utils.exec(`ls ${__dirname}/dir_files`);
    });
});

command('required-args <requiredArg>', () => {
    onAction(async () => {
        // do nothing
    });
});

command('random-options', () => {
    option('--opt <opt>', 'option input', null);
    onAction(async () => {
        tails.log(tails.getOption('opt').toString());
    });
});

initalize(process.argv, 'mocked-test', 'mock', '1.0');
