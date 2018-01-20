import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {NoteListComponent} from "./note-list.component";
import {NoteDetailsComponent} from "./note-details.component";

const noteRoutes: Routes = [
    {
        path: 'notes',
        component: NoteListComponent
    },
    {
        path: 'notes/:noteId',
        component: NoteDetailsComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(noteRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class NotesRoutingModule {
}
