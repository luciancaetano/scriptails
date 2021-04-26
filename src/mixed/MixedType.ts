import {
    toString, isBoolean, isNumber, toNumber, isArray, map,
} from 'lodash';
import MixedFile from './MixedFile';

export default class MixedType {
    public content: string | boolean | Array<string>;

    public constructor(content: string | boolean | Array<string>) {
        this.content = content;
    }

    /**
     * Convert content to string
     */
    public toString() {
        if (isArray(this.content)) {
            return this.content.join((', '));
        }

        if (isBoolean((this.content))) {
            return this.content === true ? 'true' : 'false';
        }
        return toString(this.content || '');
    }

    /**
     * Get Raw Value
     */
    public toRaw<T = any>(): T {
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
        if (isNumber(this.content)) {
            return isNumber(this.content) ? this.content : toNumber(this.content);
        }
        throw new Error(`${this.content} is not a valid number`);
    }

    /**
     * Open value as MixedFile
     * @returns {MixedFile}
     */
    public toFile() {
        return new MixedFile(this.toString());
    }

    /**
     * Handles Variadic Array
     */
    public variadic() {
        if (isArray(this.content)) {
            return map(this.content, (item) => new MixedType(item));
        }
        throw new Error(`${this.content} is not a valid array`);
    }
}
