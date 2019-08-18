import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <div class="container">
            <nav class="level">
              <div class="level-left">
                <p class="level-item">
                  <a routerLink="/">Home</a>
                </p>
                <p class="level-item">
                  <a routerLink="/page2">Page 2</a>
                </p>
              </div>
            </nav>
            <router-outlet></router-outlet>
        </div>
    `,
    styles: []
})
export class AppComponent {
}
