import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TwPageComponent } from './twitter-page/tw-page.component';
import { TwitterService } from './services/twitter-service.service';
import { GoogleAnalyticService } from './services/google-analytic.service';
import { SpeakersComponent } from './speakers/speakers.component';
import { CookiemanagerService } from './services/cookiemanager.service';
import { TwCardComponent } from './twitter-page/tw-card/tw-card.component';
import { CookieServiceModule, CookieConfig } from 'cookie-service-banner';

const testLibConfig: CookieConfig = {
  header: {
    title:"Cookie Consent Banner",
    message: "This website uses cookie to provide your the best experience. ",
    domain:"localhost",
    ga_id: "UA-164330199-1",
    color: '#fff',
    bcolor: '#000'
  },
  acceptButton: {
    enable: false,
    accept: "Got it!",
    color: '#fff',
    bcolor: '#266433'
  },
  allowButton: {
    enable: true,
    allow: "Allow Cookie",
    color: '#000',
    bcolor: '#f36e15f5'
  },
  declineButton: {
    enable: true,
    deny: "Refuse Cookie",
    color: '#000',
    bcolor: '#fff'
  },
  learnMoreLink: {
    enable: false,
    learnMore: "learn more",
    link: "www.example.com",
    color: '#3D9BFF'
  },
  review: {
    enable: true,
    message: "Review My consentement",
    color: "",
    bcolor: ""
  }
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent, TwPageComponent, HomeComponent, SpeakersComponent, TwCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    CookieServiceModule,
    CookieServiceModule.forRoot(testLibConfig),
    NgbModule,
  ],
  providers: [TwitterService, CookiemanagerService, GoogleAnalyticService],
  bootstrap: [AppComponent]
})
export class AppModule { }
