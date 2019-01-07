import {Component} from '@angular/core';

@Component({
    template: `
        <button type="button" 
                angulartics2On="click" 
                angularticsAction="SomeImportantClick"
                angularticsCategory="ImportantClicks">Some button</button>
    `
})
export class HomeComponent {
}
