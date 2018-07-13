///<reference path="../../../node_modules/@types/google-maps/index.d.ts"/>

import {Component, Input} from '@angular/core';
import {GoogleMapProvider} from "../../providers/google-map/google-map-provider";

@Component({
  selector: 'fk-locate-button',
  templateUrl: 'locate-button.html'
})
export class LocateButtonComponent {

  @Input()
  map: any;

  constructor(private mapProvider: GoogleMapProvider) {
    console.log('Hello LocateButtonComponent Component');
  }

  async onButtonClicked() {
    try{
      let position = await this.mapProvider.getCurrentPosition();
      this.map.panTo({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    }
    catch (e) {
      console.log(e);
    }
  }
}
