import * as childProcess from 'child_process';

/**
 * Exec(File) Exception Class
 */
export default class ShellExecException extends Error implements childProcess.ExecException {
    public stdout: string | Buffer;

    public stderr: string | Buffer;

    constructor(message: string, stdout: string | Buffer, stderr: string | Buffer) {
        super(message);
        this.stderr = stderr;
        this.stdout = stdout;
    }
}
