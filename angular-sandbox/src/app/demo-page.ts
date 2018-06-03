import {InjectionToken} from '@angular/core';

export const DEMO_PAGE = new InjectionToken('DEMO_PAGE');

export interface DemoPage {
  readonly title: string;
  readonly routerLink: string;
}
