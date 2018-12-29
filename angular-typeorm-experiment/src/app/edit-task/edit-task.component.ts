import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DONE_CALLBACK, MODAL_PARAM } from '../modal.service';
import { DoneCallback } from '../done-callback';
import { DataAccessService } from '../data-access.service';
import { Task } from '../task';
import { Subscription } from 'rxjs';
import { TaskComment } from '../task-comment';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit, OnDestroy {
  private commentsSubscription: Subscription;
  formGroup: FormGroup;

  newCommentFormGroup: FormGroup;
  comments: TaskComment[] = [];

  constructor(
    @Inject(MODAL_PARAM) private readonly taskId: number,
    @Inject(DONE_CALLBACK) private readonly doneCallback: DoneCallback,
    private readonly dataAccessService: DataAccessService,
    formBuilder: FormBuilder) {

    this.formGroup = formBuilder.group({
      text: ['', Validators.required]
    });

    this.newCommentFormGroup = formBuilder.group({
      text: ['', Validators.required]
    });
  }

  get text() {
    return this.formGroup.get('text');
  }

  get newCommentText() {
    return this.newCommentFormGroup.get('text');
  }

  async ngOnInit(): Promise<void> {
    const task = await this.dataAccessService.connection.manager.findOne(Task, this.taskId);
    this.formGroup.reset({
      text: task.text
    });

    this.commentsSubscription = this.dataAccessService.query(manager => manager.find(TaskComment, { where: { task: this.taskId } }))
      .subscribe(comments => this.comments = comments);
  }

  ngOnDestroy(): void {
    this.commentsSubscription.unsubscribe();
  }

  handleCancel() {
    this.doneCallback.onDone();
  }

  async handleSave(): Promise<void> {
    const value: {
      text: string
    } = this.formGroup.getRawValue();

    const task = await this.dataAccessService.connection.manager.findOne(Task, this.taskId);
    task.text = value.text;
    await this.dataAccessService.connection.manager.save(task);

    this.doneCallback.onDone();
  }

  async postComment(): Promise<void> {
    const value: {
      text: string
    } = this.newCommentFormGroup.getRawValue();

    this.newCommentFormGroup.reset();

    const task = await this.dataAccessService.connection.manager.findOne(Task, this.taskId);
    const comment = new TaskComment();
    comment.task = task;
    comment.text = value.text;
    await this.dataAccessService.connection.manager.save(comment);
  }

  async deleteComment(commentId: number): Promise<void> {
    await this.dataAccessService.connection.manager.delete(TaskComment, commentId);
  }
}
