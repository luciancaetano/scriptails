export function getProcessArgvBinaryIndex() {
    if (!!(process as any).versions.electron && !(process as any).defaultApp) return 0;
    return 1;
}

export function hideProcessArgvBinary(argv: string[]) {
    return argv.slice(getProcessArgvBinaryIndex() + 1);
}

export function getProcessArgvBinary(argv: string[]) {
    return argv[getProcessArgvBinaryIndex()];
}

export function isOption(str: string) {
    return str && (str.slice(0, 2) === '-' || str.slice(0, 1) === '-');
}
