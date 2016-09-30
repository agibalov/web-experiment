import { NotesComponent } from "./notes.component";
import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {NoteComponent} from "./note.component";

const routes: Routes = [
    { path: 'notes', component: NotesComponent }
];

@NgModule({
    imports: [ BrowserModule, RouterModule.forChild(routes) ],
    declarations: [ NotesComponent, NoteComponent ]
})
export class NotesModule {
}
