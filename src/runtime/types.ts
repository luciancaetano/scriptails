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

export interface PromptOptions {
    /**
     * Allow empty responses
     * @note if defaultValue is set allowEmpty will be useless
     */
    allowEmpty?: boolean;
    /**
     * Prompt hint text
     */
    hint?: string;
    /**
     * Default value, if is not set empty answers be prompted again
     */
    defaultValue?: string;
    /**
     * Primpt intent, like dang be red
     */
    intent?: 'danger' | 'success' | 'warning' | 'info';
}
