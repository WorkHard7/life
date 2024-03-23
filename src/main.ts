import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';
import {enableProdMode, isDevMode} from "@angular/core";

if (isDevMode()) {
  enableProdMode(); // Enable production mode
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
