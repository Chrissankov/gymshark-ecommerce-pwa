// It’s responsible for bootstrapping (starting up) the Angular app in a web browser
import { platformBrowser } from '@angular/platform-browser';
// This is the heart of your app. It brings together all components, services, and other modules you’re using
import { AppModule } from './app/app.module';

platformBrowser()
  // Use the platformBrowser to bootstrap the app using AppModule as the root module
  .bootstrapModule(AppModule, {
    ngZoneEventCoalescing: true, // It groups multiple DOM events together into fewer NgZone change detection cycles. This can lead to better performance, especially for apps with lots of events.
  })
  .catch((err) => console.error(err)); // This catches any error that happens during bootstrapping and logs it to the console.
