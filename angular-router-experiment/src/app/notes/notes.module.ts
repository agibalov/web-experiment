import {NgModule} from "@angular/core";
import {NotesRoutingModule} from "./notes-routing.module";
import {NoteListComponent} from "./note-list.component";
import {NoteDetailsComponent} from "./note-details.component";
import {NoteListResolver} from "./note-list-resolver.service";
import {CommonModule} from "@angular/common";

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
        NoteListResolver
    ]
})
export class NotesModule {
}
