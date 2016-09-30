import { Component } from '@angular/core';

@Component({
  selector: 'app',  
  styles: [`
    a {
      text-decoration: none;
    }

    a.active {
      font-weight: bold;
    }
  `],
  template: `<div>
    <h1>The Angular 2 App</h1>
    <nav>
      <a routerLink="" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Home</a>
      <a routerLink="calculator" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Calculator</a>
      <a routerLink="dbtest" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">DbTest</a>
      <a routerLink="notes" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Notes</a>
      <a routerLink="omgwtfbbq">Not Found</a>
    </nav>
    <router-outlet></router-outlet>
  </div>`
})
export class AppComponent {
}
