import {EventEmitter, Injectable} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {Geolocation, GeolocationOptions, Geoposition} from "@ionic-native/geolocation";
import LatLngLiteral = google.maps.LatLngLiteral;


@Injectable()
export class LocationTrackingProvider {

  private subscription: Subscription;

  public onLocationChanged: EventEmitter<Geoposition>;
  public lastKnownPosition: Geoposition;
  public get lastKnownLatLng(): LatLngLiteral {return this.geopositionToLatLngLiteral(this.lastKnownPosition)};

  constructor(private readonly geolocation: Geolocation) {
    this.onLocationChanged = new EventEmitter<Geoposition>();
    this.subscription = this.geolocation.watchPosition({enableHighAccuracy: true, timeout: 3000})
      .filter((p) => p.coords !== undefined).subscribe((pos) => {
        this.lastKnownPosition = pos;
        this.onLocationChanged.next(pos);
      }, (err) => {
        console.log('In watch mode: ');
        console.log(err);
      });
  }

  async getCurrentLocation(options: GeolocationOptions){
    if (this.lastKnownPosition)
      return Promise.resolve(this.lastKnownPosition);
    const promise = this.geolocation.getCurrentPosition(options);
    promise.then(geo => this.lastKnownPosition = geo, err => {
      console.error(err);
    });
    return promise;
  }

  public geopositionToLatLngLiteral(geoposition: Geoposition) {
    return {
      lat: geoposition.coords.latitude,
      lng: geoposition.coords.longitude
    }
  }
}
