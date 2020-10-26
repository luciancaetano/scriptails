import * as fs from 'fs';
import { FdWrapperWriteResponse, FdWrapperReadResponse } from '../../types';

/**
 * Wrapper's node fs.FileDescription functions to a Class
 */
export default class FileDescriptor {
    private fd: number;

    public constructor(fd: number) {
        this.fd = fd;
    }

    /**
     * Asynchronously writes `buffer` to the file referenced by the supplied file descriptor.
     * @param fd A file descriptor.
     * @param offset The part of the buffer to be written. If not supplied, defaults to `0`.
     * @param length The number of bytes to write. If not supplied, defaults to `buffer.length - offset`.
     * @param position The offset from the beginning of the file where this data should be written. If not supplied, defaults to the current position.
     */
    public write<TBuffer extends NodeJS.ArrayBufferView>(
        buffer: TBuffer,
        offset: number | undefined | null,
        length: number | undefined | null,
        position: number | undefined | null,
    ) {
        return new Promise<FdWrapperWriteResponse<TBuffer>>((resolve, reject) => {
            fs.write(this.fd, buffer, offset, length, position, (error, written: number, resBuffer: TBuffer) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({ written, buffer: resBuffer });
                }
            });
        });
    }

    /**
     * Asynchronously reads data from the file referenced by the supplied file descriptor.
     * @param offset The offset in the buffer at which to start writing.
     * @param length The number of bytes to read.
     * @param position The offset from the beginning of the file from which data should be read. If `null`, data will be read from the current position.
     */
    public read(
        offset: number,
        length: number,
        position: number | null,
    ) {
        return new Promise<FdWrapperReadResponse<Buffer>>((resolve, reject) => {
            const buffer = Buffer.alloc(length);

            fs.read(this.fd, buffer, offset, length, position, (error, bytesRead: number, resBuffer: Buffer) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({ bytesRead, buffer: resBuffer });
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
     * Return file descriptor
     */
    public getDescriptor() {
        return this.fd;
    }
}
