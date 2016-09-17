import { resolve } from 'path';
import * as chokidar from 'chokidar';

const fnMap = new Map<string, Function>();
const emit = () => fnMap.forEach(v => {
    if (v instanceof Function) v();
});

chokidar.watch('public/**/*.js', {
    cwd: resolve(__dirname, '..', '..'),
    awaitWriteFinish: false,
    ignoreInitial: true
})
    .on('add', emit)
    .on('change', emit)
    .on('unlink', emit)

export function registerOnFileChange(id: string, callback: Function): boolean {
    if (fnMap.has(id)) return false;
    fnMap.set(id, callback);
    return true;
}

export function unregisterOnFileChanged(id: string): boolean {
    if (!fnMap.has(id)) return false;
    fnMap.delete(id);
    return true;
}
