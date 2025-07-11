// Component decorator defines how Angular recognizes and loads this component
// OnInit and OnDestroy lifecycle hooks handle initialization and cleanup
import { Component, OnInit, OnDestroy } from '@angular/core';

// Import the custom Product interface to define the shape of a product object
import { Product } from '../../models/product.model';

// AuthService is used to track and react to user login/logout status
import { AuthService } from '../../services/auth.service';

// Subscription allows us to unsubscribe from observables to prevent memory leaks
import { Subscription } from 'rxjs';

// MatDialog is used to create modal dialogs using Angular Material
import { MatDialog } from '@angular/material/dialog';

// Import the dialog component used to add or edit products
import { ProductFormDialogComponent } from '../product-form-dialog/product-form-dialog.component';

// Component metadata: template, styles, and selector
@Component({
  selector: 'app-products', // The tag used in HTML to display this component
  standalone: false, // This component is part of a module, not a standalone component
  templateUrl: './products.component.html', // External HTML file for layout
  styleUrl: './products.component.scss', // External SCSS file for styles
})
export class ProductsComponent implements OnInit, OnDestroy {
  // Array of all product objects
  products: Product[] = [];

  // Boolean tracking whether the user is logged in
  isLoggedIn: boolean = false;

  // Subscription to AuthService observable
  private authSubscription!: Subscription;

  // Constructor injects AuthService and MatDialog (for login and modals)
  constructor(private authService: AuthService, private dialog: MatDialog) {}

  // Lifecycle method runs when the component is initialized
  ngOnInit(): void {
    // Subscribe to login state from AuthService
    this.authSubscription = this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status; // Update local isLoggedIn variable
    });

    // Load products from localStorage if they exist
    const stored = localStorage.getItem('products');
    if (stored) {
      try {
        this.products = JSON.parse(stored) as Product[];
      } catch (error) {
        console.error('Failed to parse stored products:', error);
      }
    }
  }

  // Lifecycle method runs when the component is destroyed
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe(); // Unsubscribe from observable to prevent memory leaks
  }

  // Returns an empty product object with default values
  getEmptyProduct(): Product {
    return {
      id: Date.now(), // Use timestamp as unique product ID
      name: '', // Empty name field
      description: '', // Empty description
      color: '', // Empty color
      price: 0, // Price set to 0
      image: '', // No image by default
    };
  }

  // Opens the product modal dialog (either for adding or editing a product)
  openModal(product: Product | null = null): void {
    // Open the ProductFormDialogComponent as a modal
    const dialogRef = this.dialog.open(ProductFormDialogComponent, {
      width: '400px', // Modal width
      data: product, // Pass product data to dialog (null if adding)
    });

    // After modal closes, process the result
    dialogRef.afterClosed().subscribe((result: Product | undefined) => {
      if (!result) return;

      if (product) {
        // If editing: find and update the existing product in array
        const index = this.products.findIndex((p) => p.id === product.id);
        if (index !== -1) {
          this.products[index] = result;
        }
      } else {
        // If adding new product: push to products array
        if (!this.products.some((p) => p.id === result.id)) {
          this.products.push(result);
        }
      }
      this.updateLocalStorage(); // Save updated list to localStorage
    });
  }

  // Deletes a product by its ID
  deleteProduct(id: number): void {
    this.products = this.products.filter((p) => p.id !== id); // Remove from array
    this.updateLocalStorage(); // Save updated list
  }

  // Saves the current products array to localStorage
  updateLocalStorage(): void {
    localStorage.setItem('products', JSON.stringify(this.products)); // Save as JSON string
  }
}
