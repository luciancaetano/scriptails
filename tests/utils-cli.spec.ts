import { cli } from './utils';

describe('Utils ns testing testing', () => {
    it('should list sonic and tails files', async () => {
        const result = await cli('./utils-cli.js', ['list-files'], '.');

        expect(result.stdout.includes('sonic')).toBe(true);
        expect(result.stdout.includes('tails')).toBe(true);

        expect(result.code).toBe(0);
    });

    it('should receive option value and returns it', async () => {
        const mockedOptions = 'mockedOptions1';
        const result = await cli('./utils-cli.js', ['random-options', `--opt=${mockedOptions}`], '.');

        expect(result.code).toBe(0);

        expect(result.stdout.includes(mockedOptions)).toBe(true);
    });

    it('should error when option not is present', async () => {
        const result = await cli('./utils-cli.js', ['--help'], '.');
        expect(result.code).toBe(0);
    });

    it('should throw error when receive invalid options', async () => {
        let result = await cli('./uti ls-cli.js', ['--invalid-option-1'], '.');
        expect(result.code).toBe(1);

        result = await cli('./uti ls-cli.js', ['list-files', '--invalid-option-1'], '.');
        expect(result.code).toBe(1);
    });

    it('should error when args not is present', async () => {
        const result = await cli('./utils-cli.js', ['required-args'], '.');
        expect(result.code).toBe(1);
    });

    it('should success when required args is present', async () => {
        const result = await cli('./utils-cli.js', ['required-args', 'arg1'], '.');
        expect(result.code).toBe(0);
    });

    it('should trhow error when command not present', async () => {
        const result = await cli('./utils-cli.js', ['command-not-present'], '.');
        expect(result.code).toBe(1);
    });
});
