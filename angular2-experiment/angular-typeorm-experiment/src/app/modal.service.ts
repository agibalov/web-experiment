import { Inject, Injectable, InjectionToken, Injector } from '@angular/core';
import { ComponentPortal, ComponentType, DomPortalOutlet, PortalInjector } from '@angular/cdk/portal';
import { DoneCallback } from './done-callback';

export const BODY_DOM_PORTAL_OUTLET = new InjectionToken<DomPortalOutlet>('BODY_DOM_PORTAL_OUTLET');

export const MODAL_PARAM = new InjectionToken<any>('MODAL_PARAM');
export const DONE_CALLBACK = new InjectionToken<DoneCallback>('DONE_PROMISE');

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(@Inject(BODY_DOM_PORTAL_OUTLET) private readonly bodyPortalOutlet: DomPortalOutlet) {
  }

  showModal<T>(componentType: ComponentType<T>, injector: Injector, param: any): Promise<any> {
    return new Promise<any>(resolve => {
      const tokens = new WeakMap();
      tokens.set(MODAL_PARAM, param);
      tokens.set(DONE_CALLBACK, {
        onDone: () => {
          this.bodyPortalOutlet.detach();
          resolve();
        }
      } as DoneCallback);

      const portalInjector = new PortalInjector(injector, tokens);
      const portal = new ComponentPortal(componentType, null, portalInjector);
      this.bodyPortalOutlet.attachComponentPortal(portal);
    });
  }
}
