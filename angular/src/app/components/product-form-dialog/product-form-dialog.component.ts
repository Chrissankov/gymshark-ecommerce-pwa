// Angular core imports
import { Component, Inject, OnInit } from '@angular/core';

// Form handling utilities
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Angular Material dialog dependencies
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Product interface for type checking
import { Product } from '../../models/product.model';

// RTL service to handle layout direction changes (for Arabic/English support)
import { RtlService } from '../../services/rtl.service';

// Component metadata
@Component({
  selector: 'app-product-form-dialog', // Selector for this dialog component
  standalone: false, // It's part of a module, not a standalone component
  templateUrl: './product-form-dialog.component.html', // HTML layout file
  styleUrls: ['./product-form-dialog.component.scss'], // SCSS styling file
})
export class ProductFormDialogComponent implements OnInit {
  // Reactive form group to manage and validate product form inputs
  productForm: FormGroup;

  // Boolean to determine RTL layout
  rtlDirection = false;

  // Inject dependencies in the constructor
  constructor(
    private fb: FormBuilder, // FormBuilder for creating the form
    private rtlService: RtlService, // RTL service to subscribe to layout direction
    private dialogRef: MatDialogRef<ProductFormDialogComponent>, // Reference to this dialog
    @Inject(MAT_DIALOG_DATA) public data: Product | null // Injected data passed into dialog (Product to edit or null to add)
  ) {
    // Initialize the form with default values or passed-in product data
    this.productForm = this.fb.group({
      id: [data?.id || Date.now()], // Generate ID or use existing one
      name: [data?.name || '', Validators.required], // Required name
      description: [data?.description || '', Validators.required], // Required description
      color: [data?.color || '', Validators.required], // Required color
      price: [data?.price || 0, [Validators.required, Validators.min(0.01)]], // Required price ≥ 0.01
      image: [data?.image || '', Validators.required], // Required image (Base64 string)
    });
  }

  // Lifecycle hook: runs when component initializes
  ngOnInit(): void {
    // Subscribe to the RTL direction observable and update the layout flag
    this.rtlService.rtlDirection$.subscribe((value) => {
      this.rtlDirection = value;
    });
  }

  // Triggered when the user selects an image
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];

      if (!validTypes.includes(file.type)) {
        alert('Only JPG, PNG, and WebP files are allowed.');
        return;
      }

      const reader = new FileReader();
      reader.onload = () =>
        this.productForm.patchValue({ image: reader.result });
      reader.readAsDataURL(file);
    }
  }

  // Save and close the dialog if the form is valid
  save(): void {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value); // Pass form data back to parent
    }
  }

  // Close the dialog without saving
  cancel(): void {
    this.dialogRef.close(); // Close dialog with no data
  }
}
