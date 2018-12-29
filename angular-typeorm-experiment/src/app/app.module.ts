import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Connection } from 'typeorm';
import { DataAccessService } from './data-access.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    DataAccessService,
    {
      provide: APP_INITIALIZER,
      useFactory: (dataAccessService: DataAccessService) => {
        return async () => await dataAccessService.initialize();
      },
      deps: [ DataAccessService ],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
