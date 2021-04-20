import { cli } from './utils';

describe('Basic CLI testing', () => {
    it('should run a cli with help arg', async () => {
        const result = await cli(['--help'], '.');

        expect(result.code).toBe(0);
        expect(result.stdout).toMatchSnapshot();
    });

    it('should match cli version', async () => {
        const result = await cli(['-V'], '.');

        expect(result.code).toBe(0);
        expect(result.stdout).toMatchSnapshot();
    });
});
