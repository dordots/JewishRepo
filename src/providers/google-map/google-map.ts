import {Injectable} from '@angular/core';
import MapOptions = google.maps.MapOptions;
import GoogleMapsLoader = require("google-maps");
import Map = google.maps.Map;
import {Geolocation} from "@ionic-native/geolocation";

@Injectable()
export class GoogleMapProvider {

  public map: Map;

  constructor(private geolocation: Geolocation) {
    console.log('Hello GoogleMapProvider Provider');
  }

  get mapOptions(): MapOptions {
    return {
      center: {
        lat: 43.0741,
        lng: -89.38098
      },
      zoom: 18,
      tilt: 30
    }
  }

  async createMap(mapDivElement: HTMLDivElement): Promise<Map>{
    await this.loadAPI();
    this.map = new google.maps.Map(mapDivElement, this.mapOptions);
    return this.map;
  }

  async getCurrentPosition(){
      return await this.geolocation.getCurrentPosition();
  }

  private loadAPI(): Promise<void> {
    GoogleMapsLoader.KEY = "AIzaSyBCptJVdxT9qytWXFkm4cVfXa6qdDWOncI";
    GoogleMapsLoader.LANGUAGE = 'he';
    GoogleMapsLoader.REGION = 'IL';
    return new Promise<void>(resolve => GoogleMapsLoader.load(() => resolve()));
  }
}
