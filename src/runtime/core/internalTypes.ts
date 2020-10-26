import * as commander from 'commander';
import MixedType from './castable/MixedType';

export type InternalContextType = 'command' | 'action' | null;

export type ScriptContextCallback = (() => void) | (() => Promise<void>);
export type ActionContextCallback = ((...args: MixedType[]) => void) | ((...args: MixedType[]) => Promise<void>);

export interface InternalContext {
    command: commander.Command | null;
    type: InternalContextType;
    promiseQueue: Array<() => Promise<void>>;
}
