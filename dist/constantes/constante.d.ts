/// <reference types="node" />
import { existsSync } from 'fs';
export declare const pathUploads: string;
export declare const unlinkAsync: (arg1: import("fs").PathLike) => Promise<unknown>;
export declare const existsAsync: typeof existsSync;
