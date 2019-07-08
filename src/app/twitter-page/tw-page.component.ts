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
    this.ttservice.authorization();
    console.log('test');
    var headers = new HttpHeaders();
    var searchval = 'query=' + this.searchQuery;
    headers.append('content-type', 'application/X-www-form-urlencoded;charset=UTF-8');
    this.http.post('http://localhost:3000/search', searchval, { headers: headers}).subscribe((res) => {
      console.log(res);
    });
  }

}
