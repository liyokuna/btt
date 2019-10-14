import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TwitterService } from './services/twitter-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Btt';
  click: boolean;
  constructor(translate: TranslateService, private http: HttpClient, private ttservice: TwitterService) {
    translate.setDefaultLang('en');
    translate.use('en');
    this.click = false;
  }

  ngOnInit() {
    this.ttservice.getRepo().subscribe((res)=>{
      console.info('repo available');
    })
  }

  ToggleClass() {
    this.click = ! this.click;
  }
}
