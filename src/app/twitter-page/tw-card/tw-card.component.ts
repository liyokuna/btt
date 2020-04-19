import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tw-card',
  templateUrl: './tw-card.component.html',
  styleUrls: ['./tw-card.component.scss']
})
export class TwCardComponent implements OnInit {

  @Input() item: any;

  constructor() { }

  ngOnInit() {
  }

}
