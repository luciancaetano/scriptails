import * as fs from 'fs';
import * as YAML from 'yaml';

export default class MixedFile {
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
    public writeContet(content: string | NodeJS.ArrayBufferView) {
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
     * Parse file contents as json to javascript object
     */
    public toJson<T = any>(encoding: BufferEncoding = 'utf-8'): T {
        const content = this.readContent();

        return JSON.parse(content.toString(encoding));
    }

    /**
     * Parse file contents as yaml to javascript object
     */
    public toYaml<T = any>(encoding: BufferEncoding = 'utf-8'): T {
        const content = this.readContent();

        return YAML.parse(content.toString(encoding));
    }
}
