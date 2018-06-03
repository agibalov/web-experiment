import {Component, Inject} from '@angular/core';
import {MESSAGE, ModalRef} from './modal-ref';

@Component({
  template: `
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modal title</p>
        </header>
        <section class="modal-card-body">{{message}}</section>
        <footer class="modal-card-foot">
          <button class="button is-danger" (click)="closeWithReject()">Close with reject</button>
          <button class="button is-success" (click)="closeWithResolve()">Close with resolve</button>
        </footer>
      </div>
    </div>
  `
})
export class ModalComponent {
  constructor(
    private modalReference: ModalRef,
    @Inject(MESSAGE) public message: string) {
  }

  closeWithReject() {
    this.modalReference.closeWithReject();
  }

  closeWithResolve() {
    this.modalReference.closeWithResolve();
  }
}
