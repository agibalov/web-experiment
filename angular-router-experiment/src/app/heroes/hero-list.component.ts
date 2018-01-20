import {Component, OnInit} from "@angular/core";
import {DatabaseService} from "../database.service";

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
export class HeroListComponent implements OnInit {
    heroes = [];

    constructor(private databaseService: DatabaseService) {}

    async ngOnInit() {
        const heroes = await (<any>this.databaseService.db).heroes.find().exec();
        this.heroes = heroes;
    }
}
