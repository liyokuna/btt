import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TwitterService } from './services/twitter-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'black-tech-twitter';
  constructor(translate: TranslateService, private http: HttpClient, private ttservice: TwitterService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit() {
    //this.ttservice.authorization();
  }
  makecall() {
    var headers = new HttpHeaders();

    headers.append('content-type', 'application/X-www-form-urlencoded;charset=UTF-8');

    this.http.post('http://localhost:3000/authorize', {headers: headers}).subscribe((res) => {
      console.log(res);
    })
  }
}
