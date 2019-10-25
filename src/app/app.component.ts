import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TwitterService } from './services/twitter-service.service';
import { CookiemanagerService } from './services/cookiemanager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Btt';
  click: boolean;
  langSaved;
  constructor(private translate: TranslateService, private http: HttpClient,
              private ttservice: TwitterService, private cookiemanager: CookiemanagerService) {
    translate.setDefaultLang('en');
    this.click = false;
  }

  ngOnInit() {
    this.langSaved = this.cookiemanager.getCookie('lang');
    this.ttservice.getRepo().subscribe((res) => {
      console.log('repo available');
    });
    if (this.langSaved) {
      this.translate.use(this.langSaved);
    }
  }

  ToggleClass() {
    this.click = ! this.click;
  }

  setLanguage(language: string) {
    this.translate.use(language);
    this.cookiemanager.setCookieWithString('lang', language, 'localhost');
    this.langSaved = language;
  }
}
