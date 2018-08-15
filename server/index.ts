import * as express from 'express';
import {join} from 'path'

const app = express();
app.use(express.static(join(__dirname, 'public')));

app.get('/ping', (req, res) => {
    return res.send('pong');
});

app.get('/',  (req, res) => {
    res.sendFile(join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);