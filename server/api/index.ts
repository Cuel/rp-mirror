import { registerOnFileChange, unregisterOnFileChanged } from './live-reload';
import { registerOnWeatherUpdate, unregisterOnWeatherUpdate } from './weather';
import { EVENTS } from '../../shared/events';

function registerSocket(socket: SocketIO.Socket) {
    const id = socket.id;
    registerOnFileChange(id, () => socket.emit(EVENTS.reload));
    registerOnWeatherUpdate(id, (data) => socket.emit(EVENTS.weather, data));
}

function unregisterSocket(socket: SocketIO.Socket) {
    const id = socket.id;
    unregisterOnFileChanged(id);
    unregisterOnWeatherUpdate(id);
}

export function registerIo(io: SocketIO.Server): void {
    io.sockets.on('connection', registerSocket);
    io.sockets.on('disconnect', unregisterSocket);
}
