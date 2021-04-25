export function isPresent(value: any) {
    return value !== null && value !== undefined && String(value).trim().length > 0;
}

export function getOptionName(flags: string[]): string {
    // Check for flags
    flags.forEach((flag) => {
        if (!(flag.slice(0, 1) === '-' || flag.slice(0, 2) !== '--')) {
            throw new Error(`Invalid flag "${flag}", flags must start with "-" for short flags or "--" for long flags.`);
        } else if (flag.includes(' ')) {
            throw new Error(`Invalid flag "${flag}", flags must not contains spaces.`);
        }
    });

    const firstLongFlag = flags.find((flag) => flag.slice(0, 2) === '--');

    if (firstLongFlag && firstLongFlag.trim().length > 0) {
        return firstLongFlag.slice(2, firstLongFlag.length);
    }

    const firstShortFlag = flags.find((flag) => flag.slice(0, 1) === '-');

    if (firstShortFlag && firstShortFlag.trim().length > 0) {
        return firstShortFlag.slice(1, firstShortFlag.length);
    }

    console.info(`firstLongFlag: ${firstLongFlag} \nfirstShortFlag: ${firstShortFlag}\n `);

    throw new Error(`Invalid flags ['${flags.join('\', \'')}'], flags must start with "-" for short flags or "--" for long flags.`);
}
