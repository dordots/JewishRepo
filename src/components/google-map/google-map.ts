import { Component } from '@angular/core';
import {GoogleMapProvider} from "../../providers/google-map/google-map";

@Component({
  selector: 'google-map',
  templateUrl: 'google-map.html',
})
export class GoogleMapComponent {

  text: string;

  constructor(private mapProvider: GoogleMapProvider) {
    console.log('Hello GoogleMapComponent Component');
    this.text = 'Hello World';
  }

}
