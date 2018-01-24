import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {NoteListComponent} from "./note-list.component";
import {NoteDetailsComponent} from "./note-details.component";
import {NoteListResolver} from "./note-list-resolver.service";
import {Note123Guard} from "./note-123-guard.service";

const noteRoutes: Routes = [
    {
        path: 'notes',
        component: NoteListComponent,
        resolve: {
            notes: NoteListResolver
        }
    },
    {
        path: 'notes/:noteId',
        component: NoteDetailsComponent,
        canActivate: [ Note123Guard ]
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
