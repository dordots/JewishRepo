import {Injectable} from '@angular/core';
import MapOptions = google.maps.MapOptions;
import GoogleMapsLoader = require("google-maps");
import Map = google.maps.Map;
import {Geolocation} from "@ionic-native/geolocation";
import LatLng = google.maps.LatLng;

@Injectable()
export class GoogleMapProvider {
  private isApiLoaded: boolean;

  constructor(private geolocation: Geolocation) {
    console.log('Hello GoogleMapProvider Provider');
  }

  loadAPI(): Promise<void> {
    if (this.isApiLoaded)
      return;
    GoogleMapsLoader.KEY = "AIzaSyBCptJVdxT9qytWXFkm4cVfXa6qdDWOncI";
    GoogleMapsLoader.LANGUAGE = 'he';
    GoogleMapsLoader.REGION = 'IL';
    GoogleMapsLoader.LIBRARIES = ['places'];
    return new Promise<void>(resolve => GoogleMapsLoader.load(() => resolve()));
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
    if (!this.isApiLoaded){
      await this.loadAPI();
      this.isApiLoaded = true;
    }
    return new google.maps.Map(mapDivElement, this.mapOptions);
  }

  async getCurrentPosition(){
      return await this.geolocation.getCurrentPosition();
  }

  createMarkerAt(map: Map, latLng: LatLng){
    return new google.maps.Marker({
      position: latLng,
      map: map
    });
  }
}
