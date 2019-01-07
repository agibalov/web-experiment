import {ApplicationRef, ComponentFactoryResolver, Inject, Injectable, Injector} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {ModalComponent} from './modal.component';
import {ModalRef, MESSAGE} from './modal-ref';

@Injectable()
export class ModalService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private applicationRef: ApplicationRef) {
  }

  show(message: string) {
    const modalComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);

    const modalReference = new ModalRef();
    const injector = Injector.create({
      providers: [
        { provide: ModalRef, useValue: modalReference },
        { provide: MESSAGE, useValue: message }
      ],
      parent: this.injector
    });

    const modalComponentRef = modalComponentFactory.create(injector);

    const doClose = () => {
      this.document.body.removeChild(modalComponentRef.location.nativeElement);
      this.applicationRef.detachView(modalComponentRef.hostView);
      modalComponentRef.destroy();
    };

    modalReference.closeWithResolve = () => {
      doClose();
      modalReference.resolve();
    };

    modalReference.closeWithReject = () => {
      doClose();
      modalReference.reject();
    };

    this.applicationRef.attachView(modalComponentRef.hostView);
    this.document.body.appendChild(modalComponentRef.location.nativeElement);

    return modalReference;
  }
}

