// Component: Decorator to define this Angular component
// OnInit: Lifecycle hook triggered once when the component is initialized (like componentDidMount in React).
// OnDestroy: Lifecycle hook triggered when the component is removed from the DOM — used for cleanup.
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RtlService } from '../../services/rtl.service';

@Component({
  selector: 'app-slider', // selector: How to use the component in HTML: <app-slider>.
  standalone: false, // This means it's part of a module, not a standalone component.
  templateUrl: './slider.component.html', // templateUrl: Points to the HTML file for the UI.
  styleUrl: './slider.component.scss', // styleUrl: SCSS file for styling.
})
export class SliderComponent implements OnInit, OnDestroy {
  rtlDirection = false;

  rtlServiceSubscription: any;

  constructor(private rtlService: RtlService) {}

  // List of image paths for the slider.
  slides: string[] = [
    'assets/images/slide1.webp',
    'assets/images/slide2.webp',
    'assets/images/slide3.webp',
    'assets/images/slide4.webp',
  ];

  // Keeps track of which slide is currently shown. Starts at index 0 (first image).
  currentIndex: number = 0;

  // Stores the setInterval ID so we can stop it later using clearInterval.
  intervalId: any;

  // This variable controls whether the image should apply the fade animation CSS class.
  fade: boolean = false;

  // This runs when the component is initialized. It calls the method that starts auto-sliding.
  ngOnInit(): void {
    this.startAutoSlide();

    // Subscribes to rtlDirection$ to support Arabic or other RTL languages dynamically.
    this.rtlServiceSubscription = this.rtlService.rtlDirection$.subscribe(
      (value) => {
        this.rtlDirection = value;
      }
    );
  }

  // When the component is destroyed, we stop the auto-slider using clearInterval. This prevents memory leaks and unnecessary processing.
  ngOnDestroy(): void {
    clearInterval(this.intervalId);

    // **Unsubscribe to prevent memory leaks and reduce main-thread usage**
    if (this.rtlServiceSubscription) {
      this.rtlServiceSubscription.unsubscribe();
    }
  }

  // setInterval() calls nextSlide() every 4000ms = 4 seconds. We store the ID in intervalId so we can stop it later.
  startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  // This changes the slide
  nextSlide(): void {
    this.fade = false; // Remove the class temporarily
    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length; // Change the current slide to the upcoming slide
      this.fade = true; // Add the class again after image changes
    }, 100); // short delay to trigger fade reflow
  }
}
