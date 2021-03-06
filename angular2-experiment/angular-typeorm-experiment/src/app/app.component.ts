import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Task } from './task';
import { DataAccessService } from './data-access.service';
import { Subscription } from 'rxjs';
import { ModalService } from './modal.service';
import { CreateTaskComponent } from './create-task/create-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { TaskComment } from './task-comment';

interface TaskRow {
  taskId: number;
  taskText: string;
  taskCommentCount: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private taskRowsSubscription: Subscription;
  private taskRows: TaskRow[] = [];

  constructor(
    private readonly injector: Injector,
    private readonly dataAccessService: DataAccessService,
    private readonly modalService: ModalService) {
  }

  ngOnInit(): void {
    this.taskRowsSubscription = this.dataAccessService.query(manager => manager.query(`
      select
        task.id as taskId,
        task.text as taskText,
        (select count(*) from task_comment where taskId = task.id) as taskCommentCount
      from task
      left join task_comment on task_comment.taskId = task.id
      group by task.id, task.text
      `)).subscribe(rows => this.taskRows = rows);
  }

  ngOnDestroy(): void {
    this.taskRowsSubscription.unsubscribe();
  }

  async showCreateTaskModal() {
    await this.modalService.showModal(CreateTaskComponent, this.injector, {});
  }

  async showEditTaskModal(taskId: number) {
    await this.modalService.showModal(EditTaskComponent, this.injector, taskId);
  }

  async deleteTask(id: number) {
    await this.dataAccessService.connection.manager.delete(TaskComment, { task: id } as any);
    await this.dataAccessService.connection.manager.delete(Task, id);
  }
}
