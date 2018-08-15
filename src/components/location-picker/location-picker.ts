import {Component, ViewChild} from '@angular/core';
import {ViewController} from "ionic-angular";
import {GoogleMapProvider} from "../../providers/google-map/google-map-provider";
import {GoogleMapComponent} from "../google-map/google-map";
import Map = google.maps.Map;
import Marker = google.maps.Marker;
import {MapObject} from "../../common/models/map-objects/server-map-object";
import LatLngLiteral = google.maps.LatLngLiteral;

@Component({
  selector: 'fk-location-picker',
  templateUrl: 'location-picker.html'
})
export class LocationPickerComponent {
  @ViewChild('mapComponent') mapComponent: GoogleMapComponent;
  @ViewChild('ionInput') locationInput;

  marker: Marker;
  mapObject: MapObject;

  constructor(private viewCtrl: ViewController,
              private mapProvider: GoogleMapProvider) {
    console.log('Hello LocationPickerComponent Component');
    this.mapObject = {latLng: null, userFriendlyAddress: null};
  }

  ngAfterViewInit() {
    this.mapComponent.onMapCreated.subscribe(args => {
      this.initOnLocationPressed(this.mapComponent.map);
    });
  }

  onAutocompleteSelect(mapObject: MapObject){
    this.changeMarkerPosition(mapObject.latLng);
  }

  private async onDismiss() {
    this.viewCtrl.dismiss()
  }

  private onSubmit() {
    this.viewCtrl.dismiss(this.mapObject);
  }

  private initOnLocationPressed(map: Map) {
    map.addListener('click', async args => {
      this.changeMarkerPosition(args.latLng);

      const latLng = this.marker.getPosition().toJSON();
      const userFriendlyAddress = (await this.mapProvider.getPlaceDetails(latLng)).formatted_address;

      this.mapObject.userFriendlyAddress = userFriendlyAddress;
      this.mapObject.latLng = latLng;
      this.locationInput._native.nativeElement.value = userFriendlyAddress;

      this.disappearAutocompleteList();
    });
  }

  private changeMarkerPosition(newPosition: LatLngLiteral){
    if (this.marker)
      this.marker.setMap(null);

    this.marker = this.mapProvider.createMarkerAt(this.mapComponent.map, newPosition);
  }

  private disappearAutocompleteList() {
    Array.from(document.getElementsByClassName('pac-container'))
      .forEach(el => (el as HTMLElement).style.display = "none");
  }

}
