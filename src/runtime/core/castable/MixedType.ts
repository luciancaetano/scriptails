import {
    toString, isBoolean, isNumber, toNumber,
} from 'lodash';
import FileWrapper from './FileWrapper';

export default class MixedType {
    public content: string | boolean;

    public constructor(content: string | boolean) {
        this.content = content;
    }

    /**
     * Convert content to string
     */
    public toString() {
        return toString(this.content || '');
    }

    /**
     * Get Raw Value
     */
    public toRaw() {
        return this.content as any;
    }

    /**
     * Parse to boolean
     */
    public toBoolean(throwError = true) {
        if (isBoolean(this.content) || (this.content === 'true' || this.content === 'false') || this.content === null || this.content === undefined) {
            return isBoolean(this.content) ? !!this.content : this.content === 'true';
        }
        if (throwError) {
            throw new Error(`${this.content} is not a valid boolean`);
        }

        return false;
    }

    /**
     * Parse string value to number
     * @throws Error
     */
    public toNumber() {
        if (isBoolean(this.content) || (this.content === 'true' || this.content === 'false')) {
            return isNumber(this.content) ? this.content : toNumber(this.content);
        }
        throw new Error(`${this.content} is not a valid number`);
    }

    /**
     * Open value as FileWrapper
     * @returns {FileWrapper}
     */
    public toFile() {
        return new FileWrapper(this.toString());
    }
}
