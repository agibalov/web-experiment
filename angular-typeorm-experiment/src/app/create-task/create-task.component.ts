import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DONE_CALLBACK } from '../modal.service';
import { DoneCallback } from '../done-callback';
import { DataAccessService } from '../data-access.service';
import { Task } from '../task';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {
  formGroup: FormGroup;

  constructor(
    @Inject(DONE_CALLBACK) private readonly doneCallback: DoneCallback,
    private readonly dataAccessService: DataAccessService,
    formBuilder: FormBuilder) {

    this.formGroup = formBuilder.group({
      text: ['', Validators.required]
    });
  }

  get text() {
    return this.formGroup.get('text');
  }

  handleCancel() {
    this.doneCallback.onDone();
  }

  async handleSave(): Promise<void> {
    const value: {
      text: string
    } = this.formGroup.getRawValue();

    const task = new Task();
    task.text = value.text;
    await this.dataAccessService.connection.manager.save(task);

    this.doneCallback.onDone();
  }
}
