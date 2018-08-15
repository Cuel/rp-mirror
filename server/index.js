import * as express from 'express';
import { join } from 'path';
var app = express();
app.use(express.static(join(__dirname, 'public')));
app.get('/ping', function (req, res) {
    return res.send('pong');
});
app.get('/', function (req, res) {
    res.sendFile(join(__dirname, 'build', 'index.html'));
});
app.listen(process.env.PORT || 8080);
//# sourceMappingURL=index.js.map