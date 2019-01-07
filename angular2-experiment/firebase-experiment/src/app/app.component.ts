import { Component } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentChangeAction} from 'angularfire2/firestore';

export interface Todo {
  text: string;
}

export interface TodoWithId extends Todo {
  id: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todosCollection: AngularFirestoreCollection<Todo>;
  todos: TodoWithId[] = [];

  constructor(db: AngularFirestore) {
    this.todosCollection = db.collection('todos');
    /*this.todosCollection.valueChanges().subscribe(todos => {
      this.todos = todos;
    });*/
    this.todosCollection.snapshotChanges().subscribe((value: DocumentChangeAction<Todo>[]) => {
      this.todos = value.map(v => {
        return {
          id: v.payload.doc.id,
          ...v.payload.doc.data() as Todo
        };
      });
    });
  }

  addTodo() {
    this.todosCollection.add({
      text: `Item ${new Date().toString()}`
    });
  }

  deleteTodo(todoId) {
    this.todosCollection.doc(todoId).delete();
  }
}
