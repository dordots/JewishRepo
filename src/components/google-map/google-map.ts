import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {GoogleMapProvider} from "../../providers/google-map/google-map-provider";
import {GoogleMap} from "../../providers/google-map/google-map";
import {EventBasedMapObjectProvider} from "../../providers/server-providers/event-based-map-object.provider";
import {NavController} from "ionic-angular";
import {SynagogueDetailsPage} from "../../pages/synagogue-details/synagogue-details";
import {ReplaySubject} from "rxjs/ReplaySubject";

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
  onMapCreated: ReplaySubject<GoogleMap>;

  constructor(private mapProvider: GoogleMapProvider) {
    console.log('Hello GoogleMapComponent Component');
    GoogleMapComponent.mapCounter++;
    this.canvasElementId = `google-map-${GoogleMapComponent.mapCounter}`;
    this.onMapCreated = new ReplaySubject<GoogleMap>(1);
  }

  async ngAfterViewInit(){
    let mapElement = document.getElementById(this.canvasElementId) as HTMLDivElement;
    this.map = await this.mapProvider.createMap(mapElement, this.mapOptions);
    this.map.enableLocationTracking();
    this.onMapCreated.next(this.map);
  }

  ngOnDestroy(): void {
    if (!this.map)
      return;
    this.map.disableLocationTracking();
    this.map.dispose();
    this.map = null;
  }
}
