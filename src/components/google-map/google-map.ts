import {AfterViewInit, Component, EventEmitter, Output} from '@angular/core';
import {GoogleMapProvider} from "../../providers/google-map/google-map-provider";
import Map = google.maps.Map;

@Component({
  selector: 'fk-google-map',
  templateUrl: 'google-map.html',
})
export class GoogleMapComponent implements AfterViewInit {
  private static mapCounter = 0;

  public readonly id: string;
  public map: Map;

  @Output()
  onMapCreated: EventEmitter<Map>;

  constructor(private mapProvider: GoogleMapProvider) {
    console.log('Hello GoogleMapComponent Component');
    GoogleMapComponent.mapCounter++;
    this.id = `google-map-${GoogleMapComponent.mapCounter}`;
    this.onMapCreated = new EventEmitter<Map>();
  }

  async ngAfterViewInit(){
    let mapElement = document.getElementById(this.id) as HTMLDivElement;
    this.map = await this.mapProvider.createMap(mapElement);
    this.onMapCreated.emit(this.map);
  }
}
