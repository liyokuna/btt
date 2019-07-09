import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TwitterService } from '../services/twitter-service.service';

@Component({
  selector: 'tw-page',
  templateUrl: './tw-page.component.html',
  styleUrls: ['./tw-page.component.scss']
})
export class TwPageComponent implements OnInit {
  tweets;
  title = 'Black Tech on Twitter';
  searchQuery = '#MADCOD';
  tweetsdata: any;

  constructor(private http: HttpClient, private ttservice: TwitterService) {}

  ngOnInit() {
    this.searchQuery;
    this.ttservice.search(this.searchQuery).subscribe((res) => {
      console.log(res);
    });
  }

}
