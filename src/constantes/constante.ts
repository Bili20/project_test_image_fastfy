import { existsSync, unlinkSync } from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';

export const pathUploads = resolve('./uploads');
export const unlinkAsync = promisify(unlinkSync);
export const existsAsync = existsSync;
