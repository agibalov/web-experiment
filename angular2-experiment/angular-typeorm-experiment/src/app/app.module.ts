import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, ApplicationRef, ComponentFactoryResolver, Injector, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DataAccessService } from './data-access.service';
import { BODY_DOM_PORTAL_OUTLET, ModalService } from './modal.service';
import { DOCUMENT } from '@angular/common';
import { DomPortalOutlet } from '@angular/cdk/portal';
import { CreateTaskComponent } from './create-task/create-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditTaskComponent } from './edit-task/edit-task.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateTaskComponent,
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
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
    },
    {
      provide: BODY_DOM_PORTAL_OUTLET,
      useFactory: (
        document: Document,
        componentFactoryResolver: ComponentFactoryResolver,
        applicationRef: ApplicationRef,
        injector: Injector) => (new DomPortalOutlet(
          document.body,
          componentFactoryResolver,
          applicationRef,
          injector)),
      deps: [ DOCUMENT, ComponentFactoryResolver, ApplicationRef, Injector ]
    },
    ModalService
  ],
  entryComponents: [
    CreateTaskComponent,
    EditTaskComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
