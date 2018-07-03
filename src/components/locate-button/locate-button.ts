import {Component} from '@angular/core';
import {GoogleMapProvider} from "../../providers/google-map/google-map";

@Component({
  selector: 'fk-locate-button',
  templateUrl: 'locate-button.html'
})
export class LocateButtonComponent {
  constructor(private mapProvider: GoogleMapProvider) {
    console.log('Hello LocateButtonComponent Component');
  }

  async onButtonClicked() {
    try{
      let position = await this.mapProvider.getCurrentPosition();
      this.mapProvider.map.panTo({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    }
    catch (e) {
      console.log(e);
    }
  }
}
