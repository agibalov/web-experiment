import {Component} from "@angular/core";
import {Note} from "./note";

@Component({
    template: `
    <div>
        <p>There are {{notes.length}} notes</p>
        <ul>
            <li *ngFor="let note of notes"><my-note 
                [note]="note" 
                (deleteNote)="deleteNote($event)"></my-note></li>
        </ul>
    </div>`
})
export class NotesComponent {
    public notes: Note[] = [
        new Note('1', 'note one'),
        new Note('2', 'note two'),
        new Note('3', 'note three')
    ];

    deleteNote(noteId: string): void {
        console.log(`notes list :: deleteNote, noteId=${noteId}`);
    }
}
