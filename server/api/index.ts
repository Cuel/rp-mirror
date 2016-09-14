import { reloadEmitter, RELOAD } from './live-reload'

export function registerIo(io) {
    io.sockets.on('connection', socket => {
        reloadEmitter.on(RELOAD, () => socket.emit(RELOAD));
    });
}
