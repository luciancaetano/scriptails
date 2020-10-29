import * as fs from 'fs';

/**
 * Wrapper's node fs.FileDescriptor functions to a Class.
 * Inspired by C file pointers
 */
export default class FileDescriptor {
    private fd: number

    private position: number;

    /**
     * @param {string} fileName
     * @param {fs.OpenMode} flags
     * @param {fs.Mode} mode
     */
    constructor(fileName: string, flags: fs.OpenMode, mode?: fs.Mode | null) {
        this.fd = fs.openSync(fileName, flags, mode);
        this.position = 0;
    }

    /**
     * Asynchronously writes `buffer` to the file.
     * @param fd A file descriptor.
     * @param {TBuffer} buffer The buffer to write
     */
    public write<TBuffer extends NodeJS.ArrayBufferView>(
        buffer: TBuffer,
    ) {
        return new Promise<TBuffer>((resolve, reject) => {
            fs.write(this.fd, buffer, 0, buffer.byteLength, this.position, (error, bytesWritten: number, response: TBuffer) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
                this.position += bytesWritten;
            });
        });
    }

    /**
     * Asynchronously reads data from the file.
     * @param length The number of bytes to read.
     */
    public read(
        length: number,
    ) {
        return new Promise<Buffer>((resolve, reject) => {
            const buffer = Buffer.alloc(length);

            fs.read(this.fd, buffer, 0, length, this.position, (error, bytesRead: number, response: Buffer) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                    this.position += length;
                }
            });
        });
    }

    /**
     * Asynchronous close(2) - close a file descriptor.
     */
    public close() {
        return new Promise<void>((resolve, reject) => {
            fs.close(this.fd, (error) => {
                if (error) {
                    reject(error);
                }
                resolve();
            });
        });
    }

    /**
     * Set the file descriptor position
     * @param {number} position
     */
    public seek(position: number) {
        this.position = position;
    }

    /**
     * Get current file descriptor position
     * @returns {number}
     */
    public tell() {
        return this.position;
    }

    /**
     * Return file descriptor pointer
     */
    public getDescriptor() {
        return this.fd;
    }
}
