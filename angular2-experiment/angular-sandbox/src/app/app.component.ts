import {Component, Inject} from '@angular/core';
import {DEMO_PAGE, DemoPage} from './demo-page';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <div class="columns">
        <div class="column is-one-fifth">
          <aside class="menu">
            <p class="menu-label">Random</p>
            <ul class="menu-list">
              <li *ngFor="let page of demoPages">
                <a [routerLink]="page.routerLink"
                   routerLinkActive="is-active"
                   [routerLinkActiveOptions]="{exact:true}">{{page.title}}</a></li>
            </ul>
          </aside>
        </div>
        <div class="column">
          <div class="container">
            <router-outlet></router-outlet>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AppComponent {
  constructor(@Inject(DEMO_PAGE) public demoPages: DemoPage[]) {
  }
}
