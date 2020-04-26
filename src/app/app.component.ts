import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TwitterService } from './services/twitter-service.service';
import { CookiemanagerService } from './services/cookiemanager.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Btt';
  domain = 'https://btt.netlify.com/';
  click: boolean;
  langSaved;
  pathLogo: string;
  ttserviceSubscription: Subscription;
  constructor(private translate: TranslateService, private http: HttpClient,
              private ttservice: TwitterService, private cookiemanager: CookiemanagerService,
              private router: Router) {
    router.events.subscribe( (event) => ( event instanceof NavigationEnd ) && this.handleRouteChange());
    translate.setDefaultLang('en');
    this.click = false;
  }

  ngOnInit() {
    this.langSaved = this.cookiemanager.getCookie('lang');
    this.ttserviceSubscription = this.ttservice.getRepo().subscribe((res) => {
      console.log('repo available' + res);
    });
    if (this.langSaved) {
      this.translate.use(this.langSaved);
    }
  }

  ToggleClass() {
    this.click = ! this.click;
  }

  onOpen($event) {
    console.log($event);
  }

  setLanguage(language: string) {
    this.translate.use(language);
    this.cookiemanager.setCookieWithString('lang', language, this.domain);
    this.langSaved = language;
  }

  handleRouteChange() {
    if (this.router.url.includes('speakers')) {
      this.pathLogo = 'speaker';
      return;
    }
    if (this.router.url.includes('tweets')) {
      this.pathLogo = 'tweet';
      return;
    }
    this.pathLogo = 'home';
    return;
  }

  ngOnDestroy() {
    this.ttserviceSubscription.unsubscribe();
  }
}
