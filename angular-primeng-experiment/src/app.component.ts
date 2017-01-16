import {Component, OnInit} from '@angular/core';
import { Message } from 'primeng/primeng'

interface Note {
    id: number;
    text: string;
}

@Component({
    selector: 'app',
    template: `
<div>
    <h1>Hello PrimeNG</h1>
    <p-tabView>
        <p-tabPanel header="Home">
            <h2>Home here</h2>
        </p-tabPanel>
        <p-tabPanel header="DataTable Test">
            <div>
            <h2>DataTable Test</h2>
            <button pButton type="button" label="Add One Row" (click)="addOneRow()"></button>
            <p-dataTable [value]="notes">
                <header>The List of Notes</header>
                <footer>The List of Notes, yes</footer>
                <p-column field="id" header="Id"></p-column>
                <p-column field="text" header="Text"></p-column>
                <p-column header="Actions">
                    <template let-note="rowData" pTemplate type="body">
                        <button pButton type="button" label="Delete" icon="fa-remove" (click)="removeOneRow(note.id)"></button>
                    </template>
                </p-column>
            </p-dataTable>
            </div>
        </p-tabPanel>
    </p-tabView>
    <p-growl [value]="messages"></p-growl>
</div>`
})
export class AppComponent implements OnInit {
    private lastId: number = 0;
    public notes: Note[] = [];
    public messages: Message[] = [];

    ngOnInit(): void {
        for(let i = 0; i < 10; ++i) {
            const note: Note = { id: ++this.lastId, text: `Note #${this.lastId}` };
            this.notes.push(note);
        }
    }

    addOneRow(): void {
        const note: Note = { id: ++this.lastId, text: `Note #${this.lastId}` };
        this.notes.push(note);

        this.messages.push({
            severity: 'info',
            summary: 'Success!',
            detail: `We've just added a note #${this.lastId}`
        });
    }

    removeOneRow(noteId: number): void {
        this.notes = this.notes.filter(note => note.id != noteId);

        this.messages.push({
            severity: 'error',
            summary: 'Success!',
            detail: `We've just removed a note #${noteId}`
        });
    }
}
