import { NotesComponent } from "./notes.component";
import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {NoteComponent} from "./note.component";
import {NoteForm} from "./note-form.component";
import {FormsModule} from "@angular/forms";

const routes: Routes = [
    { path: 'notes', component: NotesComponent }
];

@NgModule({
    imports: [ BrowserModule, FormsModule, RouterModule.forChild(routes) ],
    declarations: [ NotesComponent, NoteComponent, NoteForm ]
})
export class NotesModule {
}
