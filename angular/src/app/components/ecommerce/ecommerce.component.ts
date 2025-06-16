// Component: Decorator to define the component
// OnInit: Lifecycle hook that runs when the component is initialized
// OnDestroy: Lifecycle hook that runs when the component is destroyed (used for cleanup)
import { Component, OnInit } from '@angular/core';

// Import the Product model interface
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-ecommerce', // HTML tag used to include this component
  standalone: false, // Indicates that this component is part of a module (not standalone)
  templateUrl: './ecommerce.component.html', // Link to the component's HTML template
  styleUrl: './ecommerce.component.scss', // Link to the component's styles
})
export class EcommerceComponent implements OnInit {
  // All available products loaded from localStorage
  products: Product[] = [];

  // A dynamic object storing only selected items with quantity
  selectedProducts: { [id: number]: { product: Product; quantity: number } } =
    {};

  items: any;

  // Lifecycle hook that runs when the component initializes
  ngOnInit(): void {
    // Loads products when the component initializes.
    const stored = localStorage.getItem('products');

    const checkoutItems = localStorage.getItem('checkoutItems') ?? '';
    this.items = checkoutItems ? JSON.parse(checkoutItems) : [];

    // If data exists, parse it and shows the products
    if (stored) {
      this.products = JSON.parse(stored);
      this.selectedProducts = this.items;
      console.log(this.products);
      console.log(this.selectedProducts);
    }
  }

  // Toggle product selection (select if not selected, deselect if already selected)
  toggleSelection(product: Product): void {
    if (this.selectedProducts[product.id]) {
      // If already selected, remove it from the selectedProducts object
      delete this.selectedProducts[product.id];
    } else {
      // If not selected, add it with default quantity = 1
      this.selectedProducts[product.id] = { product, quantity: 1 };
    }
    localStorage.setItem(
      'checkoutItems',
      JSON.stringify(this.selectedProducts)
    );
  }

  // Check if a product is currently selected
  isSelected(product: Product): boolean {
    return !!this.selectedProducts[product.id]; // Returns true if the product is selected
  }

  // Increase the quantity of a selected product
  increaseQuantity(product: Product): void {
    if (this.selectedProducts[product.id]) {
      this.selectedProducts[product.id].quantity++;
    }
    localStorage.setItem(
      'checkoutItems',
      JSON.stringify(this.selectedProducts)
    );
  }

  // Decrease the quantity of a selected product (minimum quantity = 1)
  decreaseQuantity(product: Product): void {
    if (
      this.selectedProducts[product.id] &&
      this.selectedProducts[product.id].quantity > 1
    ) {
      this.selectedProducts[product.id].quantity--;
    }
    localStorage.setItem(
      'checkoutItems',
      JSON.stringify(this.selectedProducts)
    );
  }

  // Converts the selected product object into an iterable array for *ngFor
  get checkoutItems(): any {
    const items = this.items;
    if (items) {
      return Object.values(items);
    }
    return [];
  }

  // Calculate the total price based on selected products and their quantities
  get totalPrice(): number {
    if (this.checkoutItems) {
      return this.checkoutItems.reduce(
        (total: any, item: any) => total + item.product.price * item.quantity,
        0
      );
    } else {
      return 0;
    }
  }
}
