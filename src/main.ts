import 'babel-polyfill';
import 'zone.js/dist/zone';
import 'reflect-metadata';
import 'rxjs/Rx'; // needed for http.get(...).toPromise()

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import {enableProdMode} from "@angular/core";

const platform = platformBrowserDynamic();

if(process.env.ENV === 'production') {
    enableProdMode();
}

platform.bootstrapModule(AppModule);

console.log(process.env);
