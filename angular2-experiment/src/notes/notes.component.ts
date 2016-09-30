import {Component} from "@angular/core";
import {Note} from "./note";

@Component({
    template: `
    <div>
        <p>There are {{notes.length}} notes</p>
        <ul>
            <li *ngFor="let note of notes;trackBy:id"><my-note 
                [note]="note" 
                (deleteNote)="deleteNote($event)"></my-note></li>
        </ul>
        <note-form [model]="newNote" (submitNote)="createNote($event)"></note-form>
    </div>`
})
export class NotesComponent {
    public notes: Note[] = [
        new Note('1', 'note one'),
        new Note('2', 'note two'),
        new Note('3', 'note three')
    ];

    public newNote: Note = new Note(null, null);

    deleteNote(noteId: string): void {
        this.notes = this.notes.filter(n => n.id !== noteId);
    }

    createNote(note: Note): void {
        this.notes.push(note);
        this.newNote = new Note(null, null);
    }
}
