import 'zone.js/dist/zone-node';

import * as express from 'express';
import { join } from 'path';

const app = express();

const DIST_FOLDER = join(process.cwd(), 'dist/browser');

const {AppServerModuleNgFactory, LAZY_MODULE_MAP, ngExpressEngine, provideModuleMap} = require('./dist/server/main');

app.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
        provideModuleMap(LAZY_MODULE_MAP)
    ]
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

app.get('/api/message', (req, res) => {
    res.status(200).send({
        message: 'hi there! ' + new Date()
    });
});

app.get('*.*', express.static(DIST_FOLDER, {
    maxAge: '1y'
}));

app.get('*', (req, res) => {
    res.render('index', {req});
});

const port = 4000;
app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
});
