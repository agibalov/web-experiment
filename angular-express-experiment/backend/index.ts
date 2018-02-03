import 'reflect-metadata';
import * as express from 'express';
import * as morgan from 'morgan';
import * as path from 'path';
import {Container} from "inversify";
import {ApiController} from "./api-controller";
import {ConnectionProvider, DatabaseService} from "./database-service";
import {InversifyExpressServer} from "inversify-express-utils";
import {Todo} from "./todo";
import {Connection, createConnection} from "typeorm";

const container = new Container();
container.bind<ApiController>(ApiController).toSelf();
container.bind<DatabaseService>(DatabaseService).toSelf().inSingletonScope();
container.bind<ConnectionProvider>('ConnectionProvider').toProvider(context => {
    let connection: Connection;
    return async () => {
        if(connection == null) {
            connection = await createConnection({
                type: 'sqlite',
                database: 'my.db',
                entities: [
                    Todo
                ],
                synchronize: true
            });
        }
        return connection;
    }
});

const expressApp = new InversifyExpressServer(container)
    .setConfig(app => {
        app.use(morgan('common'));
    })
    .setErrorConfig(app => {
        if(process.env.SERVE_STATIC === 'true') {
            const pathToFrontend = path.join(__dirname, '../dist');
            app.use(express.static(pathToFrontend));
            app.get('*', (req, res) => {
                res.sendFile(path.join(pathToFrontend, 'index.html'));
            });
        }
    })
    .build();

const port = process.env.PORT || '4210';
expressApp.listen(port, (err) => {
    if(err) {
        console.error('Error!', err);
        return;
    }

    console.log(`Listening on port ${port}`);
});
