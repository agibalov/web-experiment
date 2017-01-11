import {Note} from "./note";
import {Component, Input, Output, EventEmitter} from "@angular/core";

@Component({
    selector: 'my-note',
    template: `<span>
        id={{note.id}}, text={{note.text}} 
        <button (click)="onDeleteClicked(note.id)">Delete</button>
    </span>`
})
export class NoteComponent {
    @Input() note: Note;
    @Output() deleteNote: EventEmitter<string> = new EventEmitter();

    onDeleteClicked(noteId: string): void {
        this.deleteNote.emit(noteId);
    }
}
