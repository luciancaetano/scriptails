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
    public exists(): boolean {
        return fs.existsSync(this.fileName);
    }

    /**
     * Read file contents
     * @param options
     */
    public readContent(options?: { encoding?: null; flag?: string; }) {
        return fs.readFileSync(this.fileName, options);
    }

    /**
     * Write content to file
     * @param content
     */
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
     * Parse file as json
     * @param encoding
     */
    public toJson<T = any>(encoding: BufferEncoding = 'utf-8'): T {
        const content = this.readContent();

        return JSON.parse(content.toString(encoding));
    }

    /**
     * Parse file as yaml
     * @param encoding
     */
    public toYaml<T = any>(encoding: BufferEncoding = 'utf-8'): T {
        const content = this.readContent();

        return YAML.parse(content.toString(encoding));
    }
}
