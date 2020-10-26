export interface FdWrapperWriteResponse<TBuffer extends NodeJS.ArrayBufferView> {
    written: number;
    buffer: TBuffer;
}
export interface FdWrapperReadResponse<TBuffer = Buffer> {
    bytesRead: number;
    buffer: TBuffer;
}

export interface ShellExecResult {
    stdout: string | Buffer;
    stderr: string | Buffer;
}

export interface CommandOptions {
    hidden?: boolean;
    isDefault?: boolean;
}
