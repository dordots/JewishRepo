import {AfterViewInit, Component} from '@angular/core';
import {GoogleMapProvider} from "../../providers/google-map/google-map";
import Map = google.maps.Map;

@Component({
  selector: 'fk-google-map',
  templateUrl: 'google-map.html',
})
export class GoogleMapComponent implements AfterViewInit{
  constructor(private mapProvider: GoogleMapProvider) {
    console.log('Hello GoogleMapComponent Component');
  }

  ngAfterViewInit(){
    let mapElement = document.getElementById('google-map') as HTMLDivElement;
    this.mapProvider.createMap(mapElement);
  }
}
