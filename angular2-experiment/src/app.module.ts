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
import { LoggingAspect } from './logging.aspect'; // TODO: it doesn't help

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'calculator', component: CalculatorComponent },
  { path: 'dbtest', component: DbTestComponent },
  { path: '**', component: PageNotFoundComponent }
];

LoggingAspect; // TODO: it doesn't help

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
  providers: [
    CalculatorService,
    LoggingAspect // TODO: it doesn't help
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  // TODO: it doesn't help
  constructor(loggingAspect: LoggingAspect) {
    console.log('AppModule instantiated! loggingAspect=', loggingAspect);
  }
}
