import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TwitterService } from './services/twitter-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'black-tech-twitter';
  click: boolean = false;
  constructor(translate: TranslateService, private http: HttpClient, private ttservice: TwitterService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
  ToggleClass() {
    this.click =!this.click
  }
}
