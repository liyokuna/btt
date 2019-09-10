import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../services/twitter-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private ttservice: TwitterService) { }

  ngOnInit() {
    this.ttservice.getRepo().subscribe((res) => {
      console.log('launched');
    });
  }

}
