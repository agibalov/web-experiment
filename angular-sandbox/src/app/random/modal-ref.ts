import {InjectionToken} from '@angular/core';

export const MESSAGE = new InjectionToken('MESSAGE');

export class ModalRef {
  resolve: () => void;
  reject: () => void;

  result: Promise<void>;

  closeWithResolve: () => void;
  closeWithReject: () => void;

  constructor() {
    this.result = new Promise<void>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}
