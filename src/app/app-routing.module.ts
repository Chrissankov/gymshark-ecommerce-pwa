import { NgModule } from '@angular/core'; // So this file can define its own Angular module
import { RouterModule, Routes } from '@angular/router'; // These are part of Angular's router system, allowing you to define URL-based navigation.

import { HomeComponent } from './components/home/home.component'; // Importing the landing page
import { EcommerceComponent } from './components/ecommerce/ecommerce.component'; // Importing the store

import { AuthGuard } from './guards/auth.guard'; // A guard that protects routes (the '/ecommerce' route).

const routes: Routes = [
  { path: '', component: HomeComponent }, // When the URL is /, it shows the HomeComponent.
  // Only accessible if the AuthGuard returns true (user is logged in).
  {
    path: 'ecommerce',
    component: EcommerceComponent,
    canActivate: [AuthGuard],
  },
  // Catches any unknown or broken routes and redirects them to the home page (''). Prevents users from seeing a blank or error page.
  { path: '**', redirectTo: '' },
];

// This sets up the router module
@NgModule({
  imports: [RouterModule.forRoot(routes)], // Registers all the routes defined above as application-level routes.
  exports: [RouterModule], // Makes the router available throughout the app.
})
export class AppRoutingModule {}
