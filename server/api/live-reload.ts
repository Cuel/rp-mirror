import { resolve } from 'path';
import * as chokidar from 'chokidar';
import { EventEmitter } from 'events';

class ReloadEmitter extends EventEmitter { };
export const reloadEmitter = new ReloadEmitter();
export const RELOAD = 'reload';

const watcher = chokidar.watch('public/**/*.js', {
    cwd: resolve(__dirname, '..', '..'),
    awaitWriteFinish: false,
    ignoreInitial: true
});

const emit = () => reloadEmitter.emit(RELOAD);
watcher
    .on('add', emit)
    .on('change', emit)
    .on('unlink', emit)
