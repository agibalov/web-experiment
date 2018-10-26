import { Component, Injector } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { HelloComponent } from './hello/hello.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private overlay: Overlay, private injector: Injector) {
  }

  showModal() {
    const overlayRef = this.overlay.create({
      width: '400px',
      height: '300px',
      positionStrategy: this.overlay.position()
        .global()
        .centerVertically()
        .centerHorizontally(),
      hasBackdrop: true
    });

    const portalInjector = new PortalInjector(this.injector, new WeakMap()
      .set(OverlayRef, overlayRef));

    const helloPortal = new ComponentPortal(HelloComponent, null, portalInjector);
    overlayRef.attach(helloPortal);
  }
}
