import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { CalculatorComponent } from './calculator.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { CalculatorService } from './calculator.service';
import { DbTestComponent } from './dbtest.component';
import { NumberToWordPipe } from './number-to-word.pipe';
import { RouterModule, Routes } from '@angular/router';
import { NotesModule } from "./notes/notes.module";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'calculator', component: CalculatorComponent },
  { path: 'dbtest', component: DbTestComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ BrowserModule, RouterModule.forRoot(routes), NotesModule ],
  declarations: [ 
    AppComponent, 
    HomeComponent, 
    CalculatorComponent, 
    PageNotFoundComponent, 
    NumberToWordPipe, 
    DbTestComponent 
  ],
  providers: [ CalculatorService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
