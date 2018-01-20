import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
    template: `hero details component {{heroId}}`
})
export class HeroDetailsComponent implements OnInit {
    heroId: string;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.heroId = params.get('heroId');
        });
    }
}
