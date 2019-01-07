import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MonacoEditorModule} from 'ngx-monaco-editor';
import {FormsModule} from '@angular/forms';
import HoverProvider = monaco.languages.HoverProvider;
import ITextModel = monaco.editor.ITextModel;
import Position = monaco.Position;
import CompletionItem = monaco.languages.CompletionItem;
import CompletionItemProvider = monaco.languages.CompletionItemProvider;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MonacoEditorModule.forRoot({
      onMonacoLoad: () => {
        monaco.languages.register({
          id: 'dummy'
        });

        monaco.languages.registerHoverProvider('dummy', <HoverProvider>{
          provideHover(model: ITextModel, position: Position) {
            const word = model.getWordAtPosition(position);
            return {
              range: model.getFullModelRange(),
              contents: [
                { value: `# ${word.word}!\n\nYou're looking at this word: ${word.word}` },
              ]
            };
          }
        });

        monaco.languages.registerCompletionItemProvider('dummy', <CompletionItemProvider>{
          provideCompletionItems(model: ITextModel, position: Position): CompletionItem[] {
            return [{
              label: 'TIME',
              kind: monaco.languages.CompletionItemKind.Text,
              detail: 'current time',
              documentation: 'This will insert the current time in ISO-8601 format.',
              insertText: new Date().toISOString()
            }];
          }
        });
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
