import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { CalculatorComponent } from './calculator.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { CalculatorService } from './calculator.service';
import { NumberToWordPipe } from './number-to-word.pipe';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'calculator', component: CalculatorComponent },
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	imports: [ BrowserModule, RouterModule.forRoot(routes) ],
	declarations: [ AppComponent, HomeComponent, CalculatorComponent, PageNotFoundComponent, NumberToWordPipe ],
	bootstrap: [ AppComponent ]
})
export class AppModule {
}
