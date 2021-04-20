export interface ShellExecResult {
    stdout: string | Buffer;
    stderr: string | Buffer;
}

export interface CommandOptions {
    hidden?: boolean;
    isDefault?: boolean;
}
