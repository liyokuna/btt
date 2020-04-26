import { Injectable } from '@angular/core';

declare let gtag;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticService {

  constructor() { }

  public eventEmitter(eventCategory: string,
    eventAction: string,
    eventLabel: string = null,
    eventValue: number = null) {
      gtag('send', 'event', {
      eventCategory,
      eventLabel,
      eventAction,
      eventValue
      });
    }
}
