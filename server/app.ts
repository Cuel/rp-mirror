import * as https from 'https';
import { readFileSync } from 'fs';
import * as express from 'express';
import { listen as ioListen } from 'socket.io';
import * as chokidar from 'chokidar';

const PORT = process.env.PORT || 8080;

const options: https.ServerOptions = {
    key: readFileSync('./ssl/server.key'),
    cert: readFileSync('./ssl/server.crt'),
    requestCert: false,
    rejectUnauthorized: false
};

export const app: express.Application = express();

app.use(express.static('../public'));
app.get('/', (req: express.Request, res: express.Response) => {
    res.sendFile('index.html');
});

const server = https.createServer(options, app).listen(PORT, 'localhost', function() {
    console.log(`Server listening on ${PORT}`);
    process.send('server:started');
});

const watcher = chokidar.watch('../public/', {
    cwd: '.',
    awaitWriteFinish: false,
    ignoreInitial: true
});

const io = ioListen(server);
io.sockets.on('connection', (socket) => {
    const update = () => socket.emit('reload');
    watcher
        .on('add', update)
        .on('change', update)
        .on('unlink', update)
})
