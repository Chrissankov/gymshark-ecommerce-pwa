import { Component } from '@angular/core'; // Imports the Component decorator.

// Decorator to mark this class as an Angular component.
@Component({ 
  selector: 'app-locations', // HTML tag to use this component: <app-locations>.
  standalone: false, // Component is NOT standalone, requires NgModule declaration.
  templateUrl: './locations.component.html', // Path to the component's HTML template.
  styleUrl: './locations.component.scss' // Path to the component's SCSS styles.
})

// Exports the LocationsComponent class.
export class LocationsComponent { 
  // Array of store objects with name and mapUrl.
  stores = [ 
    { // First store object.
      name: 'store.regent',
      mapUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2483.0715562748146!2d-0.1398565!3d51.5119032!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487605e2ec399985%3A0x98654d3be4848f92!2sGymshark!5e0!3m2!1sen!2slb!4v1744970282971!5m2!1sen!2slb",
    },
    { // Second store object.
      name: 'store.stratford',
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2481.3527116211667!2d-0.0097248!3d51.54343110000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761d0ee7bc7249%3A0x69e917cf867c55e3!2sGymshark%20Stratford!5e0!3m2!1sen!2slb!4v1744970316360!5m2!1sen!2slb",
    },
    { // Third store object.
      name: 'store.bicester',
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d153.89431854905953!2d-1.1559221148491032!3d51.891823093717164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876dd80861b584d%3A0x240e6dbe7d3493da!2s50%20Pingle%20Dr%2C%20Bicester%20OX26%206WD%2C%20UK!5e0!3m2!1sen!2slb!4v1744970539645!5m2!1sen!2slb",
    },
    { // Fourth store object.
      name: 'store.dubai',
      mapUrl:"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1805.0857647110984!2d55.2767075!3d25.1974373!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f682829c85c07%3A0xa5eda9fb3c93b69d!2sDubai%20Mall!5e0!3m2!1sen!2slb!4v1744970619040!5m2!1sen!2slb"
    }
  ];

  currentStoreIndex: number = 0; // Property to track the index of the current store (default is 0).

  changeStore(index: number): void { // Method to update the currentStoreIndex.
    this.currentStoreIndex = index; // Sets the currentStoreIndex to the provided index.
  }
}