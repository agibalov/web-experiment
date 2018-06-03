import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <div class="columns">
        <div class="column is-one-fifth">
          <aside class="menu">
            <p class="menu-label">Random</p>
            <ul class="menu-list">
              <li><a routerLink="random"
                     routerLinkActive="is-active"
                     [routerLinkActiveOptions]="{exact:true}">Random</a></li>
              <li><a routerLink="styling"
                     routerLinkActive="is-active"
                     [routerLinkActiveOptions]="{exact:true}">Styling</a></li>
            </ul>
          </aside>
        </div>
        <div class="column">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AppComponent {
}
