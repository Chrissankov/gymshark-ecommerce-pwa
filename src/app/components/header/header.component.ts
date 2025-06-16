// Component: Marks the class as an Angular component
// Renderer2: To safely manipulate DOM elements
// OnInit: Lifecycle hook for component initialization
// OnDestroy: Lifecycle hook for cleanup when component is destroyed
import {
  Component,
  Renderer2,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';

// Router: Angular service for programmatic navigation between routes
import { Router } from '@angular/router';

// Subscription: Used to manage and unsubscribe from Observables (like login status)
import { Subscription } from 'rxjs';

// AuthService: Custom service to manage login/logout logic and authentication state
import { AuthService } from '../../services/auth.service';

// Component metadata
@Component({
  selector: 'app-header', // HTML tag name to use this component
  standalone: false, // This component is not standalone, it's declared inside a module
  templateUrl: './header.component.html', // HTML template path
  styleUrl: './header.component.scss', // Styling (SCSS) path
})
export class HeaderComponent implements OnInit, OnDestroy {
  // Component state
  showMobileMenu = false; // Toggles mobile menu visibility
  fontSize = 16; // Root font size for accessibility (A+/A- functionality)
  isLoginModalOpen = false; // Controls login modal visibility
  isLoggedIn = false; // Tracks user authentication status

  // Emits event when the language is changed (to parent)
  @Output() onChangeLang = new EventEmitter<string>();

  // Subscription reference to clean up on destroy
  private authSubscription!: Subscription;

  // Inject Angular services into the component
  constructor(
    private renderer: Renderer2, // Used to manipulate the DOM (safe way)
    private router: Router, // Angular router for navigating between pages
    private authService: AuthService // Custom service for authentication state
  ) {}

  // Lifecycle hook: runs after component is initialized
  ngOnInit(): void {
    // Subscribe to the login status observable in AuthService
    this.authSubscription = this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status; // Update the local isLoggedIn flag
    });
  }

  // Lifecycle hook: runs before component is destroyed
  ngOnDestroy(): void {
    // Unsubscribe from observables to prevent memory leaks
    this.authSubscription.unsubscribe();
  }

  // Toggle mobile menu visibility
  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
  }

  // Explicitly close the mobile menu
  closeMobileMenu(): void {
    this.showMobileMenu = false;
  }

  // Increase the root font size for accessibility (up to a max of 24px)
  increaseFontSize(): void {
    if (this.fontSize < 24) {
      this.fontSize++;
      // Apply font size to root HTML element
      this.renderer.setStyle(
        document.documentElement,
        'font-size',
        `${this.fontSize}px`
      );
    }
  }

  // Decrease the root font size (down to a minimum of 12px)
  decreaseFontSize(): void {
    if (this.fontSize > 12) {
      this.fontSize--;
      this.renderer.setStyle(
        document.documentElement,
        'font-size',
        `${this.fontSize}px`
      );
    }
  }

  // Open login modal
  openLoginModal(): void {
    this.isLoginModalOpen = true;
  }

  // Close login modal
  closeLoginModal(): void {
    this.isLoginModalOpen = false;
    // Note: Login state will update via auth subscription
  }

  // Log out the user and redirect to homepage
  logout(): void {
    this.authService.logout(); // Clear auth state
    this.router.navigate(['/']); // Redirect to homepage
  }

  // Navigate to e-commerce page if logged in, otherwise prompt login
  onEcommerceClick(): void {
    if (this.isLoggedIn) {
      this.router.navigate(['/ecommerce']);
    } else {
      this.isLoginModalOpen = true; // Trigger login modal
    }
  }

  // Navigate to homepage when clicking the logo
  onLogoClick(): void {
    this.router.navigate(['/']);
  }

  // Change language and notify parent component
  changeLang(codeLang: string) {
    this.onChangeLang.emit(codeLang);
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
