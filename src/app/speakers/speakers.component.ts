import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../services/twitter-service.service';

@Component({
  selector: 'app-speakers',
  templateUrl: './speakers.component.html',
  styleUrls: ['./speakers.component.scss']
})
export class SpeakersComponent implements OnInit {

  constructor(private ttservice: TwitterService) { }

  ngOnInit() {
    this.ttservice.getSpeakers().subscribe((res) => {
      console.log('launched');
    });
  }

}
