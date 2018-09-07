///<reference path="../../../node_modules/@types/google-maps/index.d.ts"/>

import {Component, Input} from '@angular/core';
import {GoogleMapProvider} from "../../providers/google-map/google-map-provider";
import {GoogleMap} from "../../providers/google-map/google-map";

@Component({
  selector: 'fk-locate-button',
  templateUrl: 'locate-button.html'
})
export class LocateButtonComponent {

  @Input()
  map: GoogleMap;

  constructor(private mapProvider: GoogleMapProvider) {
    console.log('Hello LocateButtonComponent Component');
  }

  async onButtonClicked() {
    try{
      let position = await this.map.geolocation.getCurrentPosition({timeout: 20000, enableHighAccuracy: true});
      // let position = window.navigator.geolocation.getCurrentPosition((v)=>{
      //   console.log(v);
      // }, (err)=>{
      //   console.log(err);
      // }, {timeout: 5000, enableHighAccuracy: true});
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
