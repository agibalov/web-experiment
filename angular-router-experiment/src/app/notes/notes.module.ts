import {NgModule} from "@angular/core";
import {NotesRoutingModule} from "./notes-routing.module";
import {NoteListComponent} from "./note-list.component";
import {NoteDetailsComponent} from "./note-details.component";
import {NoteListResolver} from "./note-list-resolver.service";
import {CommonModule} from "@angular/common";
import {Note123Guard} from "./note-123-guard.service";

@NgModule({
    imports: [
        NotesRoutingModule,
        CommonModule
    ],
    declarations: [
        NoteListComponent,
        NoteDetailsComponent
    ],
    providers: [
        NoteListResolver,
        Note123Guard
    ]
})
export class NotesModule {
}
