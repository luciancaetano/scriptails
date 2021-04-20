import { cli } from './utils';

describe('Runtime lib testing', () => {
    const mockedLogValue = 'mocked-log-value';

    it('should logWithLabel', async () => {
        const result = await cli('./runtime-cli.js', ['log-label', `--input ${mockedLogValue}`], '.');
        expect(result.code).toBe(0);

        expect(result.stdout.includes(mockedLogValue)).toBe(true);
    });

    it('should log a text', async () => {
        const result = await cli('./runtime-cli.js', ['log-text', `--input ${mockedLogValue}`], '.');
        expect(result.code).toBe(0);

        expect(result.stdout.includes(mockedLogValue)).toBe(true);
    });

    it('should not logLines when flag silent is set', async () => {
        const result = await cli('./runtime-cli.js', ['log-lines', `--input ${mockedLogValue}`, '--silent'], '.');
        expect(result.code).toBe(0);

        expect(result.stdout.includes(mockedLogValue)).toBe(false);
    });

    it('should not logWithLabel when flag silent is set', async () => {
        const result = await cli('./runtime-cli.js', ['log-label', `--input ${mockedLogValue}`, '--silent'], '.');
        expect(result.code).toBe(0);

        expect(result.stdout.includes(mockedLogValue)).toBe(false);
    });

    it('should not log a text when flag silent is set', async () => {
        const result = await cli('./runtime-cli.js', ['log-text', `--input ${mockedLogValue}`, '--silent'], '.');
        expect(result.code).toBe(0);

        expect(result.stdout.includes(mockedLogValue)).toBe(false);
    });
});
