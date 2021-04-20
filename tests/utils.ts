import { exec } from 'child_process';

interface CliResponse {
    code: number | null,
    stdout: string,
    stderr: string,
    error: Error | null;
}

export const cli = (args: string[], cwd: string) => new Promise<CliResponse>((resolve) => {
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
