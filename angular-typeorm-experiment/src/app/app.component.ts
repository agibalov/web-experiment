import { Component, OnDestroy, OnInit } from '@angular/core';
import { Todo } from './todo';
import { DataAccessService } from './data-access.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private todosSubscription: Subscription;
  private countSubscription: Subscription;
  private todos: Todo[] = [];
  private count = 0;

  constructor(private readonly dataAccessService: DataAccessService) {
  }

  ngOnInit(): void {
    this.todosSubscription = this.dataAccessService.query(manager => manager.find(Todo))
      .subscribe(todos => this.todos = todos);

    this.countSubscription = this.dataAccessService.query(manager => manager.count(Todo))
      .subscribe(count => this.count = count);
  }

  ngOnDestroy(): void {
    this.todosSubscription.unsubscribe();
    this.countSubscription.unsubscribe();
  }

  async createTodo() {
    const todo = new Todo();
    todo.text = `hi there ${new Date().toISOString()}`
    await this.dataAccessService.connection.manager.save(todo);
  }

  async deleteTodo(id: number) {
    await this.dataAccessService.connection.manager.delete(Todo, id);
  }
}
