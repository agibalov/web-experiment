import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <nav class="navbar is-fixed-top is-light">
            <div class="navbar-brand">
                <div class="navbar-item has-text-weight-bold">JIRA &#9786;</div>
                <button class="button navbar-burger">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            <div class="navbar-menu">
                <div class="navbar-start">
                    <a class="navbar-item" routerLink="/"
                       routerLinkActive="is-active"
                       [routerLinkActiveOptions]="{exact:true}">ng-drag-drop</a>
                    <a class="navbar-item" routerLink="/dragula"
                       routerLinkActive="is-active"
                       [routerLinkActiveOptions]="{exact:true}">ng2-dragula</a>
                    <a class="navbar-item" routerLink="/ngxdnd"
                       routerLinkActive="is-active"
                       [routerLinkActiveOptions]="{exact:true}">ngx-dnd</a>
                </div>
            </div>
        </nav>
        <router-outlet></router-outlet>
    `
})
export class AppComponent {
}
