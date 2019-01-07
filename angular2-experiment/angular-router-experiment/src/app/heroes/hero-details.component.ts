import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {DatabaseService} from "../database.service";

@Component({
    template: `
        <div *ngIf="hero == null">hero is null</div>
        <div *ngIf="hero != null">
            hero details component {{hero.id}} {{hero.name}}
        </div>
    `
})
export class HeroDetailsComponent implements OnInit {
    hero: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private databaseService: DatabaseService) {

        console.log('HeroDetailsComponent::constructor()');
    }

    ngOnInit(): void {
        console.log('HeroDetailsComponent::ngOnInit()');

        this.activatedRoute.paramMap.subscribe(async (params: ParamMap) => {
            this.hero = await (<any>this.databaseService.db).heroes.findOne(params.get('heroId')).exec();
        });
    }
}
