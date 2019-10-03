import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TwitterService } from '../services/twitter-service.service';

@Component({
  selector: 'tw-page',
  templateUrl: './tw-page.component.html',
  styleUrls: ['./tw-page.component.scss']
})
export class TwPageComponent implements OnInit {
  loading = true;
  showScroll = false;
  checkboxGroupForm: FormGroup;
  title = 'Black Tech on Twitter';
  searchQuery = '#BlackTechPipeline';
  tweetsdata: any;

  constructor(private http: HttpClient, private ttservice: TwitterService, private formBuilder: FormBuilder) {
    this.checkboxGroupForm = this.formBuilder.group({
      btt: true,
      jobs: false,
      conf: false
    });
  }

  ngOnInit() {
    this.ttservice.search(this.searchQuery).subscribe((res) => {
      this.tweetsdata = res.data;
      this.loading = false;
    });
  }
  onChange() {
    if( this.checkboxGroupForm.value.btt && !this.checkboxGroupForm.value.jobs && !this.checkboxGroupForm.value.conf) {
      console.log(this.checkboxGroupForm.value.btt);
      this.searchQuery = '#BlackTechTwitter';
      this.ttservice.search(this.searchQuery).subscribe((res) => {
        this.tweetsdata = res.data;
      });
    }
    if( this.checkboxGroupForm.value.jobs && !this.checkboxGroupForm.value.btt && !this.checkboxGroupForm.value.conf) {
      this.searchQuery = '#Jobs';
      this.ttservice.search(this.searchQuery).subscribe((res) => {
        this.tweetsdata = res.data;
      });
    }
    if( this.checkboxGroupForm.value.conf && !this.checkboxGroupForm.value.btt && !this.checkboxGroupForm.value.jobs) {
      this.searchQuery = '#Conference';
      this.ttservice.search(this.searchQuery).subscribe((res) => {
        this.tweetsdata = res.data;
      });
    }
    if( this.checkboxGroupForm.value.conf && this.checkboxGroupForm.value.jobs && !this.checkboxGroupForm.value.btt) {
      this.searchQuery = '#Conference #Jobs';
      this.ttservice.search(this.searchQuery).subscribe((res) => {
        this.tweetsdata = res.data;
      });
    }
    if( this.checkboxGroupForm.value.btt && this.checkboxGroupForm.value.jobs && !this.checkboxGroupForm.value.conf) {
      this.searchQuery = '#BlackTechTwitter #Jobs';
      this.ttservice.search(this.searchQuery).subscribe((res) => {
        this.tweetsdata = res.data;
      });
    }
    if( this.checkboxGroupForm.value.btt && this.checkboxGroupForm.value.conf && !this.checkboxGroupForm.value.jobs) {
      this.searchQuery = '#BlackTechTwitter #Conference';
      this.ttservice.search(this.searchQuery).subscribe((res) => {
        this.tweetsdata = res.data;
      });
    }
    if( this.checkboxGroupForm.value.btt && this.checkboxGroupForm.value.conf && this.checkboxGroupForm.value.jobs) {
      this.searchQuery = '#BlackTechTwitter #Conference #Jobs';
      this.ttservice.search(this.searchQuery).subscribe((res) => {
        this.tweetsdata = res.data;
      });
    }
  }

  public ScrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  @HostListener('window:scroll', [])
  public onWindowScroll() {
    if(document.documentElement.scrollTop > window.innerHeight) {
      this.showScroll = true;
    } else {
      this.showScroll = false;
    }
  }
}
