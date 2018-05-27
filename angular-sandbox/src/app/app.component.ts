import {Component} from '@angular/core';
import {ModalService} from './modal.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <div class="buttons">
        <button type="button" class="button" (click)="toggle()">{{ show ? 'Hide' : 'Show' }}</button>
        <button type="button" class="button" (click)="increment()">Increment</button>
        <button type="button" class="button" (click)="decrement()">Decrement</button>
      </div>
      
      <div *appIf="show">hello world (*appIf)</div>
  
      <ng-template [appIf]="show">
        <div>hello world (ng-template)</div>
      </ng-template>
      
      <div *appRepeat="count; let i = index;">
        item #{{i}}
      </div>
      
      <button type="button" class="button" (click)="showModal()">Show modal</button>
    </div>
  `,
  styles: []
})
export class AppComponent {
  show = true;
  count = 3;

  constructor(private modalService: ModalService) {
  }

  toggle() {
    this.show = !this.show;
  }

  increment() {
    ++this.count;
  }

  decrement() {
    --this.count;
  }

  async showModal(): Promise<void> {
    try {
      await this.modalService.show('Hi there!!!').result;
      console.log('Dialog closed with resolve!');
    } catch (e) {
      console.log('Dialog closed with reject!');
    }
  }
}
