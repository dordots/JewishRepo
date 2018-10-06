import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {GoogleMapProvider} from "../../providers/google-map/google-map-provider";
import {GoogleMap} from "../../providers/google-map/google-map";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {OpenNativeSettings} from "@ionic-native/open-native-settings";
import MapOptions = google.maps.MapOptions;
import {MapObject} from "../../common/models/map-objects/map-objects";

@Component({
  selector: 'fk-google-map',
  templateUrl: 'google-map.html',
})
export class GoogleMapComponent implements AfterViewInit, OnDestroy{

  private static mapCounter = 0;

  private hasError = false;

  public readonly canvasElementId: string;
  public map: GoogleMap;

  @Input() mapOptions: google.maps.MapOptions;

  @Output()
  onMapCreated: ReplaySubject<GoogleMap>;
  manualCenter: MapObject;

  constructor(private mapProvider: GoogleMapProvider,
              private cdRef: ChangeDetectorRef,
              private openNativeSettings: OpenNativeSettings) {
    console.log('Hello GoogleMapComponent Component');
    GoogleMapComponent.mapCounter++;
    this.canvasElementId = `google-map-${GoogleMapComponent.mapCounter}`;
    this.onMapCreated = new ReplaySubject<GoogleMap>(1);
    this.manualCenter = new MapObject();
  }

  async ngAfterViewInit(){
    this.createMap(true);
  }

  ngOnDestroy(): void {
    if (!this.map)
      return;
    this.map.disableLocationTracking();
    this.map.dispose();
    this.map = null;
  }

  ngAfterViewChecked()
  {
    this.cdRef.detectChanges();
  }

  async createMap(withLocationTracking: boolean, mapOptions: MapOptions = this.mapOptions){
    try{
      let mapElement = document.getElementById(this.canvasElementId) as HTMLDivElement;
      this.map = await this.mapProvider.createMap(mapElement, mapOptions);
      if (withLocationTracking)
        this.map.enableLocationTracking();
      this.onMapCreated.next(this.map);
    }
    catch (e) {
      console.error(e);
      this.hasError = true;
    }
  }

  tryGetCurrentLocationAgain() {
    this.hasError = false;
    this.createMap(true);
  }

  goToLocationSettings(){
    this.openNativeSettings.open('location');
  }

  mapWithManualLocation() {
    this.createMap(false, {center: this.manualCenter.latLng})
  }

  onPlaceSelected(mapObject: MapObject) {
    this.manualCenter = mapObject;
  }
}
