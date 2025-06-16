import { Pipe, PipeTransform } from '@angular/core'; // Imports Pipe and PipeTransform decorators.
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // Imports DomSanitizer and SafeResourceUrl for security.

// Decorator to mark this class as an Angular Pipe.
@Pipe({
  name: 'safe', // Name used to invoke this pipe in templates: {{ value | safe }}.
  standalone: false // Pipe is NOT standalone, requires NgModule declaration.
})

//s Exports the SafePipe class, implementing PipeTransform.
export class SafePipe implements PipeTransform { 
  constructor(private sanitizer: DomSanitizer) {} // Injecting DomSanitizer to sanitize URLs.

  transform(url: string): SafeResourceUrl { // Method to transform the input URL.
    return this.sanitizer.bypassSecurityTrustResourceUrl(url); // Sanitizes the URL and returns a SafeResourceUrl.
  }
}