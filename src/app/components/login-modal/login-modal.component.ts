// Angular core component and utilities
import { Component, EventEmitter, Output } from '@angular/core';

// Form handling utilities
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Auth service to manage login/logout state
import { AuthService } from '../../services/auth.service';

// Component metadata
@Component({
  selector: 'app-login-modal', // Component selector
  standalone: false, // It's part of a module
  templateUrl: './login-modal.component.html', // HTML template
  styleUrls: ['./login-modal.component.scss'], // SCSS file
})
export class LoginModalComponent {
  // Outputs to communicate with parent (e.g. show/hide modal, inform about success)
  @Output() closeModal = new EventEmitter<void>();
  @Output() loginSuccess = new EventEmitter<void>();

  // Reactive forms for login and sign-up
  loginForm: FormGroup;
  signUpForm: FormGroup;

  // Boolean to toggle between login and sign-up views
  isSignUpMode: boolean = false;

  constructor(
    private fb: FormBuilder, // Used to build reactive forms
    private authService: AuthService // Auth logic (login flag handling)
  ) {
    // Initialize login form with validation
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // Initialize sign-up form with validation
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  // Triggered when the user submits the login form
  login(): void {
    const { username, password } = this.loginForm.value;

    // Get saved users from localStorage or default to empty array
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Find user with matching credentials
    const matchedUser = storedUsers.find(
      (user: any) => user.username === username && user.password === password
    );

    if (matchedUser) {
      this.authService.login(); // Update login flag in AuthService
      this.loginSuccess.emit(); // Inform parent about success
      this.closeModal.emit(); // Close modal
    } else {
      alert('Invalid credentials'); // Error message
    }
  }

  // Triggered when the user submits the sign-up form
  signUp(): void {
    const { username, password, confirmPassword } = this.signUpForm.value;

    // Ensure both passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Get existing users or initialize to empty array
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if username is already taken
    const userExists = existingUsers.some(
      (user: any) => user.username === username
    );
    if (userExists) {
      alert('Username already taken!');
      return;
    }

    // Add new user and update localStorage
    existingUsers.push({ username, password });
    localStorage.setItem('users', JSON.stringify(existingUsers));

    // Optionally set auth flag (could also auto-login)
    this.authService.signUp(username, password);
    this.loginSuccess.emit(); // Inform parent about success
    this.closeModal.emit(); // Close modal
  }

  // Emit close event to hide modal
  close(): void {
    this.closeModal.emit();
  }

  // Toggle between login and sign-up modes
  toggleSignUpMode(): void {
    this.isSignUpMode = !this.isSignUpMode;
  }
}
