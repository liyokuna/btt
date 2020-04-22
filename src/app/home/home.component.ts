import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

declare let gtag;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'Black Techies Twitter';
  click: boolean;
  constructor(private router: Router) {
    this.click = false;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('set', 'page', event.urlAfterRedirects);
        gtag('send', 'pageview');
      }
    });
  }

  focusIn() {
    this.click = ! this.click;
  }

  focusOut() {
    this.click = ! this.click;
  }

}
