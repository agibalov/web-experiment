import {Component} from '@angular/core';
import {ModalService} from './modal.service';

@Component({
  template: `
    <div class="content">
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
      
      <h1>ng-template and ng-container</h1>
      
      <h3>Single item</h3>
      <ng-container *ngTemplateOutlet="myNameAndAgeTemplate; context:{name:'John', age:123}"></ng-container>
      
      <h3>Usage inside ngFor</h3>
      <div *ngFor="let item of [11, 22, 33]">
        <ng-container *ngTemplateOutlet="myNameAndAgeTemplate; context:{name:'John ' + item, age: 123 + item}"></ng-container>
      </div>
      
      <ng-template #myNameAndAgeTemplate let-name="name" let-age="age">
        Name: {{name}}, age: {{age}}
      </ng-template>
      
      <h1>i18nPlural (a pipe - text only)</h1>
      <table class="table">
        <tbody>
          <tr *ngFor="let userCount of [0, 1, 10]">
            <td>for {{userCount}} users</td>
            <td>
              {{userCount|i18nPlural:userCountMapping}}
            </td>
          </tr>
        </tbody>
      </table>
      
      <h1>NgPlural (a directive - template selector)</h1>
      <table class="table">
        <tbody>
          <tr *ngFor="let userCount of [0, 1, 10]">
            <td>for {{userCount}} users</td>
            <td>
              <div [ngPlural]="userCount">
                <ng-template ngPluralCase="=0">
                  <span class="tag is-warning">No users here</span>
                </ng-template>
                <ng-template ngPluralCase="=1">One user</ng-template>
                <ng-template ngPluralCase="other"><span class="has-text-weight-bold">{{userCount}}</span> users</ng-template>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: []
})
export class RandomPageComponent {
  userCountMapping = {
    '=0': 'No users',
    '=1': '1 user',
    'other': '# users'
  };

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
