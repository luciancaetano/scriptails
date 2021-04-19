import * as fs from 'fs';

export default class FileWrapper {
    private fileName: string;

    public constructor(fileName: string) {
        this.fileName = fileName;
    }

    /**
     * Check if File Exists
     */
    public exists() {
        return fs.existsSync(this.fileName);
    }

    /**
     * Read File Content
     */
    public readContent(options?: { encoding?: null; flag?: string; }) {
        return fs.readFileSync(this.fileName, options);
    }

    /** Write to file */
    public writeContet(content: any) {
        return new Promise<void>((resolve, reject) => {
            fs.writeFile(this.fileName, content, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    /**
     * Parse file contents to json
     */
    public toJson<T = any>(encoding: BufferEncoding = 'utf-8'): T {
        const content = this.readContent();

        return JSON.parse(content.toString(encoding));
    }
}
