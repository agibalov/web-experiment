import {Component} from '@angular/core';

@Component({
    template: `
        <button type="button" 
                angulartics2On="click" 
                angularticsAction="SomeNotVeryImportantClick"
                angularticsCategory="ImportantClicks">Some other button</button>
    `
})
export class Page2Component {
}
