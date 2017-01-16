import 'primeng/resources/themes/omega/theme.css'
import 'primeng/resources/primeng.min.css'
import 'font-awesome/css/font-awesome.min.css'

import 'zone.js/dist/zone'
import 'reflect-metadata'

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
