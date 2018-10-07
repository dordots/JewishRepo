import {Injectable} from '@angular/core';
import GoogleMapsLoader = require("google-maps");
import MapOptions = google.maps.MapOptions;
import LatLngLiteral = google.maps.LatLngLiteral;
import GeocoderResult = google.maps.GeocoderResult;
import "rxjs/add/operator/filter";
import {GoogleMap} from "./google-map";
import "rxjs/add/operator/retry";
import {LocationTrackingProvider} from "../location-tracking/location-tracking";
import {merge} from "lodash-es";

@Injectable()
export class GoogleMapProvider {
  public isApiLoaded: boolean;

  constructor(private locationTracking: LocationTrackingProvider) {
    console.log('Hello GoogleMapProvider Provider');
  }

  loadAPI(): Promise<void> {
    if (this.isApiLoaded)
      return;
    GoogleMapsLoader.KEY = "AIzaSyBCptJVdxT9qytWXFkm4cVfXa6qdDWOncI";
    GoogleMapsLoader.LANGUAGE = 'he';
    GoogleMapsLoader.REGION = 'IL';
    GoogleMapsLoader.VERSION = '3.34';
    GoogleMapsLoader.LIBRARIES = ['places'];
    return new Promise<void>(resolve => GoogleMapsLoader.load(() => {
      resolve();
    }));
  }

  get defaultMapOptions(): MapOptions {
    return {
      zoom: 18,
      tilt: 30,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
  }

  async createMap(mapDivElement: HTMLDivElement, mapOptions?: MapOptions): Promise<GoogleMap> {
    await this.loadAPI();
    mapOptions = merge(mapOptions , this.defaultMapOptions);

    mapOptions.center = await this.getMapCenterOrCurrentLocation(mapOptions);

    const googleMap = new google.maps.Map(mapDivElement,mapOptions || this.defaultMapOptions);
    let mapManager = new GoogleMap(googleMap,this.locationTracking);

    return mapManager;
  }

  getPlaceDetails(location: LatLngLiteral): Promise<GeocoderResult> {
    let geocoder = new google.maps.Geocoder();
    return new Promise<GeocoderResult>((resolve, reject) => {
      geocoder.geocode({location: location}, (results, status1) => {
        if (results && results.length > 0) {
          resolve(results[0]);
        } else {
          reject('Cannot determine address at this location');
        }
      });
    });
  }

  private async getMapCenterOrCurrentLocation(mapOptions?: MapOptions){
    if (mapOptions.center){
      return mapOptions.center;
    }

    const position = await this.locationTracking.getCurrentLocation({timeout: 3000});
    return this.locationTracking.geopositionToLatLngLiteral(position);
  }
}
