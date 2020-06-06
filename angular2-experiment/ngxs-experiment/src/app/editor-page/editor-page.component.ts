import { Component, Injectable, OnInit } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UpdateFormValue } from '@ngxs/form-plugin';

export interface EditorFormModel {
  name: string;
  description: string;
}

export interface EditorStateModel {
  editorForm: {
    model?: EditorFormModel;
  };
  working: boolean;
}

export class SaveData {
  static readonly type = '[Editor] Save Data';
  constructor(readonly name: string, readonly description: string) {
  }
}

@State<EditorStateModel>({
  name: 'editor',
  defaults: {
    editorForm: {
      model: undefined
    },
    working: false
  }
})
@Injectable()
export class EditorState {
  @Action(SaveData)
  async saveData(ctx: StateContext<EditorStateModel>, action: SaveData) {
    ctx.patchState({ working: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Saved: name=${action.name}, description=${action.description}`);
    } finally {
      ctx.patchState({ working: false });
    }
  }
}

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.scss']
})
export class EditorPageComponent implements OnInit {
  editorState$ = this.store.select(state => state.editor);

  readonly editorForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9_ -]+$/)
    ]),
    description: new FormControl('', Validators.required)
  });

  constructor(private readonly store: Store) {
  }

  async ngOnInit() {
    await this.store.dispatch(new UpdateFormValue({
      path: 'editor.editorForm',
      value: {
        name: 'Default name',
        description:  'Default description'
      }
    })).toPromise();
  }

  async handleSubmit() {
    const editorFormModel = this.store.selectSnapshot<EditorFormModel>(state => state.editor.editorForm.model);
    console.log(`Form data: name=${editorFormModel.name}, description=${editorFormModel.description}`);

    await this.store.dispatch(new SaveData(editorFormModel.name, editorFormModel.description)).toPromise();

    await this.store.dispatch(new UpdateFormValue({
      path: 'editor.editorForm',
      value: {
        name: '',
        description: ''
      }
    })).toPromise();
  }
}
