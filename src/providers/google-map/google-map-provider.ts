import {Injectable} from '@angular/core';
import {Geolocation} from "@ionic-native/geolocation";
import {AppAssetsProvider} from "../app-assets/app-assets";
import {ApplicationMapObject} from "../../common/models/map-objects/map-objects";
import GoogleMapsLoader = require("google-maps");
import MapOptions = google.maps.MapOptions;
import LatLngLiteral = google.maps.LatLngLiteral;
import GeocoderResult = google.maps.GeocoderResult;
import "rxjs/add/operator/filter";
import {GoogleMap} from "./google-map";

@Injectable()
export class GoogleMapProvider {
  public isApiLoaded: boolean;

  constructor(public readonly geolocation: Geolocation,
              private appAssets: AppAssetsProvider) {
    console.log('Hello GoogleMapProvider Provider');
  }

  loadAPI(): Promise<void> {
    if (this.isApiLoaded)
      return;
    GoogleMapsLoader.KEY = "AIzaSyBCptJVdxT9qytWXFkm4cVfXa6qdDWOncI";
    GoogleMapsLoader.LANGUAGE = 'he';
    GoogleMapsLoader.REGION = 'IL';
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
    const currentLocation = await this.geolocation.getCurrentPosition({timeout: 20000, enableHighAccuracy: true});
    mapOptions = mapOptions || this.defaultMapOptions;
    mapOptions.center = {
      lat: currentLocation.coords.latitude,
      lng: currentLocation.coords.longitude
    };
    let map = new GoogleMap(new google.maps.Map(mapDivElement, mapOptions || this.defaultMapOptions), this.geolocation);
    return map;
  }

  async drawMapObjects(map: GoogleMap, mapObjects: ApplicationMapObject[]): Promise<google.maps.Marker[]> {
    let markerParams = await Promise.all(mapObjects.map(async obj => ({
      map: map,
      latLng: obj.latLng,
      options: {
        icon: {
          url: await this.appAssets.getIconPath(obj.type),
          scaledSize: new google.maps.Size(30, 30)
        } as google.maps.Icon
      },
    })));
    return markerParams.map(params => map.createMarkerAt(params.latLng, params.options));
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
