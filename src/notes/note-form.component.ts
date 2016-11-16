import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Note} from "./note";

@Component({
    selector: 'note-form',
    template: `
    <h3>Note Form</h3>
    <form (ngSubmit)="onSubmit()">
        <input type="text" [(ngModel)]="model.id" name="id">
        <input type="text" [(ngModel)]="model.text" name="text">
        <button type="submit">Submit</button>
    </form>
`
})
export class NoteForm {
    @Input() model: Note;
    @Output() submitNote: EventEmitter<Note> = new EventEmitter();

    onSubmit(): void {
        this.submitNote.emit(this.model);
    }
}
