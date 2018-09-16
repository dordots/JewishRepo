import {Component, Input} from '@angular/core';
import {GoogleMapProvider} from "../../providers/google-map/google-map-provider";
import {GoogleMap} from "../../providers/google-map/google-map";
import {LocationTrackingProvider} from "../../providers/location-tracking/location-tracking";

@Component({
  selector: 'fk-locate-button',
  templateUrl: 'locate-button.html'
})
export class LocateButtonComponent {

  @Input()
  map: GoogleMap;

  constructor(private locationTracking: LocationTrackingProvider) {
    console.log('Hello LocateButtonComponent Component');
  }

  async onButtonClicked() {
    try{
      let position = await this.locationTracking.getCurrentLocation({timeout: 3000, enableHighAccuracy: true});
      this.map.map.panTo({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    }
    catch (e) {
      console.log(e);
    }
  }
}
