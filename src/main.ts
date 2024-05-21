import { enableProdMode, importProvidersFrom, ImportProvidersSource } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { routes } from './app/app-routing';
import { AppComponent } from './app/app.component';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const routeProvider = provideRouter(routes) ;

bootstrapApplication(AppComponent, {
  providers: [
    routeProvider,
    importProvidersFrom(
      IonicModule.forRoot(),
    )
  ]
})
  .catch(err => console.log(err));
