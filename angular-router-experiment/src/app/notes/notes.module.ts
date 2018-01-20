import {NgModule} from "@angular/core";
import {NotesRoutingModule} from "./notes-routing.module";
import {NoteListComponent} from "./note-list.component";
import {NoteDetailsComponent} from "./note-details.component";

@NgModule({
    imports: [
        NotesRoutingModule
    ],
    declarations: [
        NoteListComponent,
        NoteDetailsComponent
    ]
})
export class NotesModule {
}
