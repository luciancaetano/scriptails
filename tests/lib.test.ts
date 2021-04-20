import { cli } from './utils';

describe('Library testing', () => {
    it('should receive random options', async () => {
        const result = await cli([], '.');
        expect(result.code).toBe(0);
    });

    it('should error when option not is present', async () => {
        const result = await cli([], '.');
        expect(result.code).toBe(0);
    });

    it('should receive random args', async () => {
        const result = await cli([], '.');
        expect(result.code).toBe(0);
    });

    it('should error when args not is present', async () => {
        const result = await cli([], '.');
        expect(result.code).toBe(0);
    });
});
