// This makes the class eligible for dependency injection, so Angular can automatically create and provide it where needed.
import { Injectable } from '@angular/core';

// CanActivate: An interface for route guards that decide if a route can be activated.
// Router: Allows navigation via code (e.g., redirecting to another page)
import { CanActivate, Router } from '@angular/router';

// his makes the AuthGuard available globally, as a singleton. You don’t need to register it manually in a module — Angular will handle it.
@Injectable({
  providedIn: 'root',
})

// This class implements the CanActivate interface, meaning it must define a canActivate() method, which returns true or false to allow/deny route access.
export class AuthGuard implements CanActivate {
  // You inject the Router to be able to redirect users when needed.
  constructor(private router: Router) {}

  // CanActivate logic: runs before route loads
  canActivate(): boolean {
    // Check if 'isLoggedIn' flag in localStorage is set to 'true'
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // If the user is not logged in, redirect to home ('/') and deny access by returning false
    if (!isLoggedIn) {
      this.router.navigate(['/']); // Redirect to homepage or login if not logged in
      return false; // Block access to the protected route
    }

    return true; // Allow access if user is logged in
  }
}
