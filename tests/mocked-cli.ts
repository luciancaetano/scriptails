import {
    scriptStart, command, onAction, tails, commandDescription,
} from '../src';

command('list-files', () => {
    commandDescription('it should list files');
    onAction(async (platform) => {
        const debug = tails.getOption('debug');

        if (platform.toString() === 'android') {
            if (debug) {
                await tails.utils.exec('cd /');
                tails.log('Build Success');
            } else {
                await tails.utils.exec('./android/gradlew assembleRelease');
                tails.log('Build Success');
            }
        } else {
            tails.exitError('Only android platform is supported now');
        }
    });
});

scriptStart(process.argv, 'mocked-test', 'mock', {}, '1.0');
