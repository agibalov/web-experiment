import {Injectable} from "@angular/core";
import RxDB, {RxDatabase} from "rxdb";

declare function require(x: any): any;

@Injectable()
export class DatabaseService {
    private _db: RxDatabase;

    async initialize() {
        if(this._db != null) {
            throw new Error('Already initialized!');
        }

        RxDB.plugin(require('pouchdb-adapter-memory'));
        const db = await RxDB.create({
            name: 'testdb',
            adapter: 'memory'
        });

        const heroes = await db.collection({
            name: 'heroes',
            schema: {
                version: 0,
                title: 'Hero',
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        primary: true
                    },
                    name: {
                        type: 'string'
                    }
                },
                required: [ 'name' ]
            }
        });

        await heroes.insert({ id: '1', name: 'Hero #1' });
        await heroes.insert({ id: '2', name: 'Hero #2' });
        await heroes.insert({ id: '3', name: 'Hero #3' });
        await heroes.insert({ id: '4', name: 'Hero #4' });
        await heroes.insert({ id: '5', name: 'Hero #5' });

        this._db = db;
    }

    get db() {
        if(this._db == null) {
            throw new Error('Not initialized!');
        }
        return this._db;
    }
}
