import { exec } from 'child_process';

interface CliResponse {
    code: number | null,
    stdout: string,
    stderr: string,
    error: Error | null;
}
const cli = (args: string[], cwd: string) => new Promise<CliResponse>((resolve) => {
    const response: CliResponse = {
        code: null,
        stderr: '',
        stdout: '',
        error: null,
    };
    const res = exec(`npm run test:cli -- ${args.join(' ')}`, { cwd });

    res.stdout?.on('data', (data) => {
        response.stdout += data.toString();
    });

    res.stderr?.on('data', (data) => {
        response.stderr += data.toString();
    });

    res.on('error', (error) => {
        response.error = error;
    });

    res.on('exit', (code) => {
        response.code = code;
        resolve(response);
    });
});

describe('Basic CLI testing', () => {
    it('should run a cli without any args', async () => {
        const result = await cli([], '.');

        expect(result.code).toBe(0);
        expect(result.stdout).toMatchSnapshot();
    });

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
