import {Component} from '@angular/core';
import {GoogleMapProvider} from "../../providers/google-map/google-map";
import {Geolocation} from "@ionic-native/geolocation";
import {promisify} from "es6-promisify";
import {Position} from "@angular/compiler";


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
