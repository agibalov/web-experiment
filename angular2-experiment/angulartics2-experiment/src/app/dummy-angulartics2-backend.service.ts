import {Inject, Injectable} from "@angular/core";
import {Angulartics2} from "angulartics2";

@Injectable()
export class DummyAngulartics2Backend {
    constructor(@Inject(Angulartics2) private angulartics2: Angulartics2) {
        this.angulartics2.pageTrack.subscribe(x => {
            console.log('pageTrack', JSON.stringify(x));
        });
        this.angulartics2.eventTrack.subscribe(x => {
            console.log('eventTrack', JSON.stringify(x));
        });
    }
}
