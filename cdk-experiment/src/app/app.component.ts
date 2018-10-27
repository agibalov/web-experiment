import { Component, Injector } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { HelloComponent } from './hello/hello.component';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ItemComponent } from './item/item.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  todo = [
    'Item one',
    'Item two'
  ];

  done = [
    'Item three',
    'Item four',
    'Item five'
  ];

  items: string[] = Array.from({ length: 100000 }).map((_, i) => `Item #${i + 1}`);

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

  drop(event: CdkDragDrop<string[]>) {
    if (event.container === event.previousContainer) {
      const item = event.container.data[event.previousIndex];
      event.container.data.splice(event.previousIndex, 1);
      event.container.data.splice(event.currentIndex, 0, item);
    } else {
      const [ item ] = event.previousContainer.data.splice(event.previousIndex, 1);
      event.container.data.splice(event.currentIndex, 0, item);
    }
  }

  get itemInstanceCount() {
    return ItemComponent.InstanceCount;
  }
}
