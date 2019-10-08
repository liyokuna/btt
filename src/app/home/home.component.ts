import { Component } from '@angular/core';
import { TwitterService } from '../services/twitter-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = "Black Techies Twitter";
  click: boolean;
  constructor(private ttservice: TwitterService) {
    this.click = false;
  }

  focusIn() {
    this.click = ! this.click;
  }

  focusOut() {
    this.click = ! this.click;
  }

}
