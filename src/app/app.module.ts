import { NgModule } from '@angular/core'; // Imports the NgModule decorator — used to mark a class as an Angular module.
import { BrowserModule } from '@angular/platform-browser'; //  Essential for running the app in a browser. It includes common directives like *ngIf and *ngFor.
import { FormsModule } from '@angular/forms'; // FormsModule: Template-driven forms (e.g., [(ngModel)]).
import { ReactiveFormsModule } from '@angular/forms'; // ReactiveFormsModule: For reactive forms (e.g., FormGroup, FormControl, etc.).

import { AppRoutingModule } from './app-routing.module'; // This brings in your app’s routing configuration — navigation between components/pages.

// These lines import all the major visual pieces (components) of your app. Each of these will be declared in the declarations array below.
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SliderComponent } from './components/slider/slider.component';
import { LocationsComponent } from './components/locations/locations.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { EcommerceComponent } from './components/ecommerce/ecommerce.component';
import { HomeComponent } from './components/home/home.component';
import { ProductFormDialogComponent } from './components/product-form-dialog/product-form-dialog.component';

// A custom pipe, likely used to bypass Angular’s built-in sanitization for certain content like iframe URLs.
import { SafePipe } from './pipes/safe.pipe';

//  These are part of the ngx-translate library for handling internationalization (i18n). You’ll load translation JSON files dynamically from assets/i18n.
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

//  HttpClient lets you make HTTP requests (GET, POST, etc.).
// The provideHttpClient(withInterceptorsFromDi()) sets up Angular’s modern HttpClient system with support for DI-based interceptors.
import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

// Bring in Angular Material UI components
//  For form elements and icons:
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// For modal dialogs like your login or product form modals:
import { MatDialogActions } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

import { ColorPickerDirective } from 'ngx-color-picker';

@NgModule({
  // All components and pipes used in this module must be declared here.
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    LocationsComponent,
    SafePipe,
    ProductsComponent,
    LoginModalComponent,
    EcommerceComponent,
    HomeComponent,
    ProductFormDialogComponent,
  ],
  // All modules that this module depends on must be imported here (UI modules, routing, forms, translation, etc.)
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogActions,
    MatDialogModule,
    ColorPickerDirective,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())], // Using the modern “standalone providers” API.
  bootstrap: [AppComponent], // This tells Angular which component to render first — your app’s root component
})
export class AppModule {}

// This function creates a new TranslateHttpLoader instance. This lets your app support multiple languages using files like en.json, ar.json
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json'); // Load JSON files from the ./assets/i18n/ directory. Use .json as the file extension.
}
