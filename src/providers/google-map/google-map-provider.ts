import {Injectable} from '@angular/core';
import {AppAssetsProvider} from "../app-assets/app-assets";
import GoogleMapsLoader = require("google-maps");
import MapOptions = google.maps.MapOptions;
import LatLngLiteral = google.maps.LatLngLiteral;
import GeocoderResult = google.maps.GeocoderResult;
import "rxjs/add/operator/filter";
import {GoogleMap} from "./google-map";
import {fromPromise} from "rxjs/observable/fromPromise";
import "rxjs/add/operator/retry";
import {LocationTrackingProvider} from "../location-tracking/location-tracking";

@Injectable()
export class GoogleMapProvider {
  public isApiLoaded: boolean;

  constructor(private locationTracking: LocationTrackingProvider,
              private appAssets: AppAssetsProvider) {
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
    if (!this.isApiLoaded) {
      await this.loadAPI();
      this.isApiLoaded = true;
    }

    mapOptions = mapOptions || this.defaultMapOptions;


    try{
      const currentLocation = await fromPromise(this.locationTracking.getCurrentLocation()).retry(3).toPromise();
      mapOptions.center = {
        lat: currentLocation.coords.latitude,
        lng: currentLocation.coords.longitude
      };
    }
    catch (e) { console.error('Could not get current location or last known location of last month' + e); }

    let map = new GoogleMap(new google.maps.Map(mapDivElement,
                            mapOptions || this.defaultMapOptions),
                            this.locationTracking,
                            this.appAssets);
    return map;
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
}
