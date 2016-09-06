import * as https from 'https';
import { readFileSync } from 'fs';
import * as express from 'express';
import { router } from './routes/';

const PORT = process.env.PORT || 8080;

const options: https.ServerOptions = {
    key: readFileSync('./ssl/server.key'),
    cert: readFileSync('./ssl/server.crt'),
    requestCert: false,
    rejectUnauthorized: false
};

export const app: express.Application = express();

app.use(express.static('../public'));
app.use(router);

https.createServer(options, app).listen(PORT, 'localhost', function() {
    console.log(`Server listening on ${PORT}`);
    process.send('server:started');
});
