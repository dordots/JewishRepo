import {Component} from '@angular/core';
import {GoogleMapProvider} from "../../providers/google-map/google-map";
import {Geolocation} from "@ionic-native/geolocation";

@Component({
  selector: 'fk-locate-button',
  templateUrl: 'locate-button.html'
})
export class LocateButtonComponent {
  constructor(private mapProvider: GoogleMapProvider,
              private geolocation: Geolocation) {
    console.log('Hello LocateButtonComponent Component');
  }

  async onButtonClicked() {
    try{
      let position = await this.geolocation.getCurrentPosition();
      this.mapProvider.map.panTo({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    }
    catch (e) {
      console.log(e);
    }
  }
}
