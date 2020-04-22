import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TwitterService } from '../services/twitter-service.service';
import { Subscription } from 'rxjs';

declare let gtag;

@Component({
  selector: 'app-tw-page',
  templateUrl: './tw-page.component.html',
  styleUrls: ['./tw-page.component.scss']
})
export class TwPageComponent implements OnInit, OnDestroy {
  loading = true;
  isLoading = false;
  loadedAll = false;
  showScroll = false;
  isFirstLoad = true;
  noData = false;
  checkboxGroupForm: FormGroup;
  titlePage = ' - Black Tech on Twitter';
  searchQuery = '#BlackTechPipeline';
  ttserviceSubscription: Subscription;
  tweetsdata: any[] = [];

  constructor(private http: HttpClient, private ttservice: TwitterService, private formBuilder: FormBuilder, private title: Title,
    private router: Router) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          gtag('set', 'page', event.urlAfterRedirects);
          gtag('send', 'pageview');
        }
      });
      this.checkboxGroupForm = this.formBuilder.group({
        btt: true,
        jobs: false,
        conf: false
      });
  }

  ngOnInit() {
    this.title.setTitle(this.title.getTitle() + this.titlePage);
    this.getTweets(this.searchQuery);
    this.handleScroll();
  }

  getTweets(query: string): void {
    let temp: any[] = [];
    this.ttserviceSubscription = this.ttservice.search(query).subscribe((res) => {
      if (res.success) {
        if (res.data.length) {
          temp = res.data;
          temp.forEach(element => {
            this.tweetsdata.push(element);
          });
          this.loading = false;
          this.isFirstLoad = false;
        } else {
          this.loadedAll = true;
        }
      } else {
        this.loading = false;
        this.isLoading = false;
        this.loadedAll = true;
        this.noData = true;
      }
      this.isLoading = false;
    });
    temp.length = 0;
  }

  onChange() {
    if ( this.checkboxGroupForm.value.btt && !this.checkboxGroupForm.value.jobs && !this.checkboxGroupForm.value.conf) {
      console.log(this.checkboxGroupForm.value.btt);
      this.searchQuery = '#BlackTechTwitter';
      this.resetVar();
      this.loading = true;
      this.getTweets(this.searchQuery);
    }
    if ( this.checkboxGroupForm.value.jobs && !this.checkboxGroupForm.value.btt && !this.checkboxGroupForm.value.conf) {
      this.searchQuery = '#Jobs';
      this.resetVar();
      this.loading = true;
      this.getTweets(this.searchQuery);
    }
    if ( this.checkboxGroupForm.value.conf && !this.checkboxGroupForm.value.btt && !this.checkboxGroupForm.value.jobs) {
      this.searchQuery = '#Conference';
      this.resetVar();
      this.loading = true;
      this.getTweets(this.searchQuery);
    }
    if ( this.checkboxGroupForm.value.conf && this.checkboxGroupForm.value.jobs && !this.checkboxGroupForm.value.btt) {
      this.searchQuery = '#Conference #Jobs';
      this.resetVar();
      this.loading = true;
      this.getTweets(this.searchQuery);
    }
    if ( this.checkboxGroupForm.value.btt && this.checkboxGroupForm.value.jobs && !this.checkboxGroupForm.value.conf) {
      this.searchQuery = '#BlackTechTwitter #Jobs';
      this.resetVar();
      this.loading = true;
      this.getTweets(this.searchQuery);
    }
    if ( this.checkboxGroupForm.value.btt && this.checkboxGroupForm.value.conf && !this.checkboxGroupForm.value.jobs) {
      this.searchQuery = '#BlackTechTwitter #Conference';
      this.resetVar();
      this.loading = true;
      this.getTweets(this.searchQuery);
    }
    if ( this.checkboxGroupForm.value.btt && this.checkboxGroupForm.value.conf && this.checkboxGroupForm.value.jobs) {
      this.searchQuery = '#BlackTechTwitter #Conference #Jobs';
      this.resetVar();
      this.loading = true;
      this.getTweets(this.searchQuery);
    }
  }

  public ScrollToTop(): void {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  @HostListener('window:scroll', [])
  public onWindowScroll() {
    if (document.documentElement.scrollTop > window.innerHeight) {
      this.showScroll = true;
    } else {
      this.showScroll = false;
    }
  }

  handleScroll(): void {
    window.onscroll = () => this.detectBottom();
  }

  detectBottom(): void {
    if ((window.innerHeight + window.scrollY) === document.body.scrollHeight) {
      if (!this.loadedAll) {
        this.ttservice.paginatePage();
        this.getTweets(this.searchQuery);
        this.isLoading = true;
      }
    }
  }

  resetVar(): void {
    this.tweetsdata.length = 0;
    this.ttservice.paginateReset();
  }

  ngOnDestroy() {
    this.ttserviceSubscription.unsubscribe();
    this.resetVar();
  }
}
