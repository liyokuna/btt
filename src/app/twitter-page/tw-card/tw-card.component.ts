import { Component, OnInit, Input } from '@angular/core';
import { GoogleAnalyticService } from '../../services/google-analytic.service';

@Component({
  selector: 'app-tw-card',
  templateUrl: './tw-card.component.html',
  styleUrls: ['./tw-card.component.scss']
})
export class TwCardComponent implements OnInit {

  @Input() item: any;

  constructor(private googleAnalyticsService: GoogleAnalyticService) { }

  ngOnInit() {
  }

  SendProfileEvent(tag: string) {
    this.googleAnalyticsService.eventEmitter("twitter-page", "profile", tag, 1);
  }

}
