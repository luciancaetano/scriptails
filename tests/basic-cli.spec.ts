import { cli } from './utils';

describe('Basic CLI testing', () => {
    it('should run a cli with help', async () => {
        const result = await cli('basic-cli.js', ['--help'], '.');
        expect(result.stdout).toMatchSnapshot();
        expect(result.code).toBe(0);
    });

    it('should match cli version', async () => {
        const result = await cli('basic-cli.js', ['--version'], '.');
        expect(result.stdout).toMatchSnapshot();
        expect(result.code).toBe(0);
    });

    it('should run a cli with help and match expected commands', async () => {
        const result = await cli('basic-cli.js', ['--help'], '.');

        expect(result.stdout.includes('sonic')).toBe(true);
        expect(result.stdout.includes('amy')).toBe(true);
        expect(result.stdout.includes('eggman')).toBe(true);
        expect(result.stdout.includes('knuckles')).toBe(true);

        expect(result.code).toBe(0);
    });
});
