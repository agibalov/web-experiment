import {Component, NgZone} from '@angular/core';
import ICodeLensSymbol = monaco.languages.ICodeLensSymbol;
import CodeLensProvider = monaco.languages.CodeLensProvider;
import ITextModel = monaco.editor.ITextModel;
import CancellationToken = monaco.CancellationToken;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  counter = 0;
  message = '';
  code = `hello world
Click 'The first line' at the top - this will trigger the CodeLensProvider
Start typing 'TIME' - this will trigger the CompletionItemProvider
Hover any word in this text - this will trigger the HoverProvider`;

  constructor(private zone: NgZone) {}

  onMonacoEditorInit(editor) {
    const commandId = editor.addCommand(0, (...args) => {
      this.zone.run(() => {
        ++this.counter;
        this.message = `I am command ${this.counter}! ${args}`;
      });
    }, '');

    monaco.languages.registerCodeLensProvider('dummy', <CodeLensProvider>{
      provideCodeLenses(model: ITextModel, token: CancellationToken): ICodeLensSymbol[] {
        return [{
          range: new monaco.Range(1, 1, 1, 100),
          id: 'First line',
          command: {
            id: commandId,
            title: 'The first line',
            arguments: ['some', 'arguments', 123]
          }
        }];
      }
    });
  }
}
