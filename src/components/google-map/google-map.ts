import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {GoogleMapProvider} from "../../providers/google-map/google-map-provider";
import {GoogleMap} from "../../providers/google-map/google-map";

@Component({
  selector: 'fk-google-map',
  templateUrl: 'google-map.html',
})
export class GoogleMapComponent implements AfterViewInit, OnDestroy{

  private static mapCounter = 0;

  public readonly canvasElementId: string;
  public map: GoogleMap;

  @Input() mapOptions: google.maps.MapOptions;

  @Output()
  onMapCreated: EventEmitter<GoogleMap>;

  constructor(private mapProvider: GoogleMapProvider) {
    console.log('Hello GoogleMapComponent Component');
    GoogleMapComponent.mapCounter++;
    this.canvasElementId = `google-map-${GoogleMapComponent.mapCounter}`;
    this.onMapCreated = new EventEmitter<GoogleMap>();
  }

  async ngAfterViewInit(){
    let mapElement = document.getElementById(this.canvasElementId) as HTMLDivElement;
    this.map = await this.mapProvider.createMap(mapElement, this.mapOptions);
    this.map.enableLocationTracking({enableHighAccuracy: true, timeout: 3000});
    this.onMapCreated.emit(this.map);
  }

  ngOnDestroy(): void {
    this.map.disableLocationTracking();
    this.map.dispose();
    this.map = null;
  }
}
