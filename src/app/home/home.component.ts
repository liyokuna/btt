import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../services/twitter-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private ttservice: TwitterService) { }
  click: boolean = false;
  ngOnInit() {
    this.ttservice.getRepo().subscribe((res) => {
      console.log('launched');
    });
  }

  focusIn() {
    this.click =!this.click;
  }

  focusOut() {
    this.click =!this.click;
  }

}
