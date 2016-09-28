import 'lovefield/dist/lovefield';
import { Component } from '@angular/core';

@Component({
  template: `<div>
    <button type="button" (click)="testPromises()">Test promises</button>
    <button type="button" (click)="testAsyncAwait()">Test async/await</button>
  </div>`
})
export class DbTestComponent {
  // can't do async/await when target is es5, it only works for target es6
  // chrome seems to support es6, but I didn't manage to switch to es6 easily :-/
  testPromises(): void {
    console.log('click()!');

    const schemaBuilder = lf.schema.create('notes', 1);
    schemaBuilder.createTable('Note')
      .addColumn('id', lf.Type.INTEGER)
      .addColumn('text', lf.Type.STRING)
      .addPrimaryKey(['id']);

    const db = schemaBuilder.connect({
      storeType: lf.schema.DataStoreType.MEMORY
    }).then((db) => {
      const noteTable = db.getSchema().table('Note');

      db.insertOrReplace().into(noteTable).values([
        noteTable.createRow({ id: 1, text: 'hi there' })
      ]).exec().then(() => {
        console.log('done');  
      });        
    });    
  }

  async testAsyncAwait(): Promise<void> {
    console.log('click()!');

    const schemaBuilder = lf.schema.create('notes', 1);
    schemaBuilder.createTable('Note')
      .addColumn('id', lf.Type.INTEGER)
      .addColumn('text', lf.Type.STRING)
      .addPrimaryKey(['id']);

    const db = await schemaBuilder.connect({
      storeType: lf.schema.DataStoreType.MEMORY
    })
    
    const noteTable = db.getSchema().table('Note');

    await db.insertOrReplace().into(noteTable).values([
      noteTable.createRow({ id: 1, text: 'hi there' })
    ]).exec();
    
    console.log('done');        
  }
}
