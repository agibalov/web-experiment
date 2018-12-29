import { Injectable } from '@angular/core';
import { Connection, createConnection, EntityManager, EntitySubscriberInterface, EventSubscriber, InsertEvent, RemoveEvent, UpdateEvent } from 'typeorm/browser';
import { Todo } from './todo';
import { Observable } from 'rxjs';
import { Subscriber } from 'rxjs/src/internal/Subscriber';

@Injectable()
export class DataAccessService {
  private _connection: Connection;
  private _callbacks: (() => Promise<void>)[] = [];

  async initialize(): Promise<void> {
    if (this._connection) {
      throw new Error('Already initialized!');
    }

    const connection = await createConnection({
      type: 'sqljs',
      entities: [ Todo ],
      synchronize: true,
      autoSave: true,
      location: 'mydb'
    });

    connection.subscribers.push(new DelegatingSubscriber(() => this.refresh()));

    this._connection = connection;
  }

  get connection(): Connection {
    if (!this._connection) {
      throw new Error('Not initialized!');
    }

    return this._connection;
  }

  query<TResult>(queryFactory: (manager: EntityManager) => Promise<TResult>): Observable<TResult> {
    if (!this._connection) {
      throw new Error('Not initialized!');
    }

    return Observable.create((subscriber: Subscriber<TResult>) => {
      const callback = async () => {
        const results = await queryFactory(this._connection.manager);
        subscriber.next(results);
      };
      this._callbacks.push(callback);

      callback();

      return () => {
        this._callbacks = this._callbacks.filter(s => s !== callback);
      };
    });
  }

  private async refresh() {
    if (!this._connection) {
      throw new Error('Not initialized!');
    }

    for (const callback of this._callbacks) {
      await callback();
    }
  }
}

@EventSubscriber()
class DelegatingSubscriber implements EntitySubscriberInterface {
  constructor(private readonly afterAnyEvent: (event: any) => Promise<void>) {
  }

  async afterInsert(event: InsertEvent<any>): Promise<void> {
    await this.afterAnyEvent(event);
  }

  async afterRemove(event: RemoveEvent<any>): Promise<void> {
    await this.afterAnyEvent(event);
  }

  async afterUpdate(event: UpdateEvent<any>): Promise<void> {
    await this.afterAnyEvent(event);
  }
}
