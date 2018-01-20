import {Component} from "@angular/core";

interface Hero {
    id: string;
    name: string;
}

@Component({
    template: `
        <div class="columns">
            <div class="column is-2">
                <aside class="menu">
                    <p class="menu-label">
                        Heroes
                    </p>
                    <ul class="menu-list">
                        <li *ngFor="let hero of heroes">
                            <a [routerLink]="[hero.id]" 
                               routerLinkActive="is-active"
                               [routerLinkActiveOptions]="{exact:true}">{{hero.name}}</a>
                        </li>
                    </ul>
                </aside>
            </div>
            <div class="column">
                <router-outlet></router-outlet>    
            </div>
        </div>
    `
})
export class HeroListComponent {
    heroes: Hero[] = [
        { id: '1', name: 'hero 1' },
        { id: '2', name: 'hero 2' },
        { id: '3', name: 'hero 3' },
        { id: '4', name: 'hero 4' },
        { id: '5', name: 'hero 5' }
    ];
}
