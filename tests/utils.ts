import { exec } from 'child_process';
import * as path from 'path';

interface CliResponse {
    code: number | null,
    stdout: string,
    stderr: string,
    command: string;
    error: Error | null;
}

export const cli = (file: string, args: string[], cwd: string) => new Promise<CliResponse>((resolve) => {
    const response: CliResponse = {
        code: null,
        stderr: '',
        stdout: '',
        error: null,
        command: '',
    };
    try {
        const command = `node ${path.resolve(path.join(__dirname, file))} ${args.join(' ')}`;
        const res = exec(command, { cwd });

        response.command = command;

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
    } catch (e) {
        response.code = 1;
        resolve(response);
        response.error = e;
    }
});
