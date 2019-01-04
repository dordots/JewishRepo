import { Injectable } from "@angular/core";
import "rxjs/add/operator/filter";
import { GoogleMap } from "./google-map";
import "rxjs/add/operator/retry";
import { LocationTrackingProvider } from "../location-tracking/location-tracking";
import { merge } from "lodash-es";
import GoogleMapsLoader = require("google-maps");
import MapOptions = google.maps.MapOptions;
import GeocoderResult = google.maps.GeocoderResult;
import LatLngLiteral = google.maps.LatLngLiteral;

@Injectable()
export class GoogleMapProvider {
  public isApiLoaded: boolean;

  constructor(private locationTracking: LocationTrackingProvider) {
    console.log("Hello GoogleMapProvider Provider");
  }

  get defaultMapOptions(): MapOptions {
    return {
      zoom: 18,
      tilt: 30,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
  }

  async createMap(
    mapDivElement: HTMLDivElement,
    mapOptions?: MapOptions
  ): Promise<GoogleMap> {
    mapOptions = merge(mapOptions, this.defaultMapOptions);

    mapOptions.center = await this.getMapCenterOrCurrentLocation(mapOptions);

    const googleMap = new google.maps.Map(
      mapDivElement,
      mapOptions || this.defaultMapOptions
    );
    return new GoogleMap(googleMap, this.locationTracking);
  }

  getPlaceDetails(location: LatLngLiteral): Promise<GeocoderResult> {
    let geocoder = new google.maps.Geocoder();
    return new Promise<GeocoderResult>((resolve, reject) => {
      geocoder.geocode({ location: location }, results => {
        if (results && results.length > 0) {
          resolve(results[0]);
        } else {
          reject("Cannot determine address at this location");
        }
      });
    });
  }

  getDistanceFromLatLonInKm(latLng1: LatLngLiteral, latLng2: LatLngLiteral) {
    const lat1 = latLng1.lat;
    const lon1 = latLng1.lng;
    const lat2 = latLng2.lat;
    const lon2 = latLng2.lng;

    let R = 6371; // Radius of the earth in km
    let dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    let dLon = this.deg2rad(lon2 - lon1);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  private async getMapCenterOrCurrentLocation(mapOptions?: MapOptions) {
    if (mapOptions.center) {
      return mapOptions.center;
    }

    const position = await this.locationTracking.getCurrentLocation({
      timeout: 3000
    });
    return this.locationTracking.geopositionToLatLngLiteral(position);
  }
}
