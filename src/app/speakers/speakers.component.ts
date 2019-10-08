import { Component, NgZone } from '@angular/core';
import { TwitterService } from '../services/twitter-service.service';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_dataviz from "@amcharts/amcharts4/themes/dataviz.js";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

// Themes begin
am4core.useTheme(am4themes_dataviz);
am4core.useTheme(am4themes_animated);
// Themes end

@Component({
  selector: 'app-speakers',
  templateUrl: './speakers.component.html',
  styleUrls: ['./speakers.component.scss']
})

export class SpeakersComponent {

  private chart: am4maps.MapChart;
  public retrieves: any;
  constructor(private ttservice: TwitterService, private zone: NgZone) { }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
 
      /* Create map instance */
      let chart = am4core.create("chartdiv", am4maps.MapChart);

      /* Set map definition */
      chart.geodata = am4geodata_worldLow;

      /* Set projection */
      chart.projection = new am4maps.projections.Miller();

      // Create map polygon series
      let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

      // Exclude Antartica
      polygonSeries.exclude = ["AQ"];

      // Add zoom control
      chart.zoomControl = new am4maps.ZoomControl();

      // Make map load polygon (like country names) data from GeoJSON
      polygonSeries.useGeodata = true;

      //data retrieves
        this.ttservice.getSpeakers().subscribe((res) => {
          polygonSeries.data = res.data;
          console.log(res.data);
        });

      // Configure series
      let polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = "{name}: {value} speaker(s)";
      polygonTemplate.fill = chart.colors.getIndex(0).lighten(0.5);

      polygonTemplate.propertyFields.fill = "color";

      // Create hover state and set alternative fill color
      let hs = polygonTemplate.states.create("hover");
      hs.properties.fill = chart.colors.getIndex(0);

      //Retrieve dat from json
      polygonTemplate.events.on("hit", function(ev) {
        let data: any;
        data = ev.target.dataItem.dataContext;
        ev.target.series.chart.zoomToMapObject(ev.target);
        let info = document.getElementById("info");
        info.innerHTML = "<h3>" + data.name + "</h3>";
        if (data.description) {
          info.innerHTML += data.description;
        }
        else {
          info.innerHTML += `<i>No data</i>`
        }
      });

    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}
