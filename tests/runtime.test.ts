import { cli } from './utils';

describe('Runtime lib testing', () => {
    it('should run a cli with help arg', async () => {
        const result = await cli(['--help'], '.');

        expect(result.code).toBe(0);
        expect(result.stdout).toMatchSnapshot();
    });

    it('should match cli version', async () => {
        const result = await cli(['--version'], '.');
        expect(result.code).toBe(0);
    });

    it('should run utils.exec', async () => {
        const result = await cli([], '.');
        expect(result.code).toBe(0);
    });

    it('should run utils.execFile', async () => {
        const result = await cli([], '.');
        expect(result.code).toBe(0);
    });

    it('should logLines', async () => {
        const result = await cli([], '.');
        expect(result.code).toBe(0);
    });

    it('should logWithLabel', async () => {
        const result = await cli([], '.');
        expect(result.code).toBe(0);
    });

    it('should log a text', async () => {
        const result = await cli([], '.');
        expect(result.code).toBe(0);
    });

    it('should not logLines when flag silent is set', async () => {
        const result = await cli([], '.');
        expect(result.code).toBe(0);
    });

    it('should not logWithLabel when flag silent is set', async () => {
        const result = await cli([], '.');
        expect(result.code).toBe(0);
    });

    it('should not log a text when flag silent is set', async () => {
        const result = await cli([], '.');
        expect(result.code).toBe(0);
    });
});
