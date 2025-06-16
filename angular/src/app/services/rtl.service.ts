import { Injectable } from '@angular/core'; // Makes this a singleton service available app-wide — no need to provide it manually in a module.
import { BehaviorSubject } from 'rxjs'; // Remembers and emits the latest value to new subscribers.

@Injectable({ providedIn: 'root' })
export class RtlService {
  // Starts with false and returns the latest value to new subscribers.
  private rtlDirectionSubject = new BehaviorSubject<boolean>(false);
  // Exposes an observable that components (like SliderComponent) can subscribe to for live updates.
  rtlDirection$ = this.rtlDirectionSubject.asObservable();

  // Call this from a language toggle or settings page to switch modes dynamically.
  setDirection(isRtl: boolean) {
    this.rtlDirectionSubject.next(isRtl);
  }

  // Lets you synchronously check the current mode if needed outside of async subscriptions.
  getCurrentDirection() {
    return this.rtlDirectionSubject.value;
  }
}
