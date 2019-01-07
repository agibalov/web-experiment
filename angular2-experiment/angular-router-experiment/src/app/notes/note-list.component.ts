import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
    template: `
        <h1>note list component</h1>
        <ul>
            <li *ngFor="let note of notes">{{note}}</li>
        </ul>
    `
})
export class NoteListComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    notes: string[];

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.subscription = this.activatedRoute.data.subscribe(data => {
            this.notes = data.notes;
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
