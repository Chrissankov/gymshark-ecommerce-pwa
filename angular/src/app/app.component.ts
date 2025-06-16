/*
Non-standalone components must be declared within an NgModule to be used in your application. The module manages their dependencies and makes them available to other parts of the application.
In essence, standalone: true simplifies component creation and usage by removing the explicit need for NgModules for that specific component.
*/

import { Component } from '@angular/core'; // Component from Angular core to define a component.

import { TranslateService } from '@ngx-translate/core'; // TranslateService to handle dynamic language switching.
import { RtlService } from './services/rtl.service'; // Your custom RtlService to toggle RTL (right-to-left) layout dynamically (likely for Arabic).

@Component({
  selector: 'app-root', // Selector to use this component in HTML
  templateUrl: './app.component.html', // Component HTML template
  standalone: false, // Part of a module, not standalone
  styleUrl: './app.component.scss', // Component styling
})
export class AppComponent {
  rtlDirection = false; // rtlDirection is a boolean used to toggle between LTR and RTL layout, affecting both layout and direction attribute in the HTML.

  constructor(
    private translate: TranslateService, // Injects TranslateService
    private rtlService: RtlService // Injects RtlService
  ) {
    this.translate.addLangs(['ar', 'en']); // Registers two available languages: 'ar' (Arabic) and 'en' (English)
    this.translate.setDefaultLang('en'); // Sets English as the default language
  }

  // This method handles language switching
  changeLang(codeLang: string) {
    localStorage.setItem('currentLang', codeLang); // Saves the selected language in localStorage.
    this.translate.use(codeLang); // Switches the language using ngx-translate.
    this.rtlDirection = codeLang === 'ar'; // If Arabic is selected, it sets rtlDirection to true.
    this.rtlService.setDirection(this.rtlDirection); // Calls rtlService.setDirection(...) to update any global layout logic tied to RTL.
  }
}
