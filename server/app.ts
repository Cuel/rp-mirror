import * as https from 'https';
import { readFileSync } from 'fs';
import * as express from 'express';
import { listen as ioListen } from 'socket.io';
import { registerIo } from './api'
import { init } from './handlers/weather'

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

const io = ioListen(server);
registerIo(io);

init(300000)
