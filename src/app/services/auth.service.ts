// Marks this class as a service that can be injected into other components or services
import { Injectable } from '@angular/core';

// BehaviorSubject is a special kind of observable from Reactive Extensions for JavaScript
// It holds the **current value** and emits it to new subscribers immediately
// Useful for keeping track of login state across the app
import { BehaviorSubject } from 'rxjs';


// Injectable decorator configures how this service is provided
@Injectable({
  // Makes this service a singleton that can be injected anywhere in the app without registering in a module
  providedIn: 'root'
})
export class AuthService {
  // Private BehaviorSubject to hold login state
  // The service uses a boolean BehaviorSubject to track if the user is logged in
  // Its initial value depends on whether a token (or flag) exists in localStorage
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  // Public observable for other components to subscribe to
  public isLoggedIn$ = this.loggedIn.asObservable();
  // Exposes the login state as a read-only observable
  // Components can **subscribe** to this and update their UI reactively when login state changes

  // Constructor
  constructor() {}

  // Checks if login flag exists in localStorage
  private hasToken(): boolean {
    // Checks if the 'isLoggedIn' item exists in localStorage and is set to 'true'
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  // Simulates login
  login(): void {
    localStorage.setItem('isLoggedIn', 'true'); // Store login flag in localStorage
    this.loggedIn.next(true); // Emit `true` to all subscribers (e.g., components)
  }

  // Simulates logout
  logout(): void {
    localStorage.removeItem('isLoggedIn'); // Remove login flag from localStorage
    this.loggedIn.next(false); // Emit `false` to update subscribers
  }

  signUp(username: string, password: string): void {
    // Sign-up logic here
    console.log('User signed up with username:', username);
    // For now, store it locally, or connect to backend for real sign-up.
  }
}
