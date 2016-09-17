import { registerOnFileChange, unregisterOnFileChanged } from './live-reload';
import { EVENTS } from '../../shared/events';

function registerSocket(socket: SocketIO.Socket) {
    const id = socket.id;
    registerOnFileChange(id, () => socket.emit(EVENTS.reload));
}

function unregisterSocket(socket: SocketIO.Socket) {
    const id = socket.id;
    unregisterOnFileChanged(id);
}

export function registerIo(io: SocketIO.Server): void {
    io.sockets.on('connection', registerSocket);
    io.sockets.on('disconnect', unregisterSocket);
}
