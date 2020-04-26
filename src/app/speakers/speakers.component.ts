import { Component, NgZone, OnDestroy, AfterViewInit, OnInit } from '@angular/core';
import { TwitterService } from '../services/twitter-service.service';
import { GoogleAnalyticService } from '../services/google-analytic.service';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4themes_dataviz from '@amcharts/amcharts4/themes/dataviz.js';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

declare let gtag;

// Themes begin
am4core.useTheme(am4themes_dataviz);
am4core.useTheme(am4themes_animated);
// Themes end

@Component({
  selector: 'app-speakers',
  templateUrl: './speakers.component.html',
  styleUrls: ['./speakers.component.scss']
})

export class SpeakersComponent implements OnInit, OnDestroy, AfterViewInit {

  private chart: am4maps.MapChart;
  public retrieves: any;
  titlePage = '- Speakers Maps';
  constructor(private ttservice: TwitterService, private zone: NgZone, private title: Title, private router: Router,
    private googleAnalyticsService: GoogleAnalyticService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('set', 'page', event.urlAfterRedirects);
        gtag('send', 'pageview');
      }
    });
   }

  ngOnInit() {
    this.title.setTitle(this.title.getTitle() + this.titlePage);
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {

      const chart = am4core.create('chartdiv', am4maps.MapChart);

      chart.geodata = am4geodata_worldLow;

      chart.projection = new am4maps.projections.Miller();

      const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

      polygonSeries.exclude = ['AQ'];

      chart.zoomControl = new am4maps.ZoomControl();

      polygonSeries.useGeodata = true;

      this.ttservice.getSpeakers().subscribe((res) => {
        polygonSeries.data = res.data;
      });

      const polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = '{name}: {value} speaker(s)';
      polygonTemplate.fill = chart.colors.getIndex(0).lighten(0.5);

      polygonTemplate.propertyFields.fill = 'color';

      const hs = polygonTemplate.states.create('hover');
      hs.properties.fill = chart.colors.getIndex(0);

      polygonTemplate.events.on('hit', (ev) => {
        let data: any;
        data = ev.target.dataItem.dataContext;
        ev.target.series.chart.zoomToMapObject(ev.target);
        const info = document.getElementById('info');
        info.innerHTML = '<h3>' + data.name + '</h3>';
        if (data.description) {
          info.innerHTML += data.description;
        } else {
          info.innerHTML += `<i>No data</i>`;
        }
      });

    });
  }

  SendRegisterEvent() {
    this.googleAnalyticsService.eventEmitter("speakerPage", "register", "gitBlackSpeaker", 1);
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}
