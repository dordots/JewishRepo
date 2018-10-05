import {EventEmitter, Injectable} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {Geolocation, GeolocationOptions, Geoposition} from "@ionic-native/geolocation";
import LatLngLiteral = google.maps.LatLngLiteral;
import {Observable} from "rxjs/Observable";
import {fromPromise} from "rxjs/observable/fromPromise";
import "rxjs/add/operator/finally";


@Injectable()
export class LocationTrackingProvider {

  public currentLocationPromise: Promise<Geoposition>;
  private watchSubscription: Subscription;

  public onLocationChanged: EventEmitter<Geoposition>;
  public lastKnownPosition: Geoposition;

  public get lastKnownLatLng(): LatLngLiteral {
    return this.geopositionToLatLngLiteral(this.lastKnownPosition)
  };

  constructor(private readonly geolocation: Geolocation) {
    this.onLocationChanged = new EventEmitter<Geoposition>();
    this.startWatchLocation();
  }

  async getCurrentLocation(options?: GeolocationOptions) {
    this.currentLocationPromise = this.currentLocationPromise || this.geolocation.getCurrentPosition(options);
    this.lastKnownPosition = await this.currentLocationPromise;
    this.currentLocationPromise = null;
    return this.lastKnownPosition;
  }

  // async getCurrentLocation(options?: GeolocationOptions) {
  //   if (this.lastKnownPosition && this.watchSubscription && !this.watchSubscription.closed)
  //     return this.lastKnownPosition;
  //
  //   if (this.currentLocationPromise)
  //     return this.currentLocationPromise;
  //
  //   const watchEnabled = this.watchSubscription && !this.watchSubscription.closed;
  //
  //   if (watchEnabled)
  //     this.stopWatchLocation();
  //
  //   this.currentLocationPromise = this.geolocation.getCurrentPosition(options);
  //
  //   const pos = await this.currentLocationPromise;
  //
  //   this.currentLocationPromise = null;
  //
  //   if (JSON.stringify(this.lastKnownLatLng) !== JSON.stringify(this.geopositionToLatLngLiteral(pos)))
  //     this.onLocationChanged.emit(pos);
  //   this.lastKnownPosition = pos;
  //
  //   if (watchEnabled)
  //     this.startWatchLocation();
  //
  //   return pos;
  // }

  public geopositionToLatLngLiteral(geoposition: Geoposition) {
    if (!geoposition)
      return null;
    return {
      lat: geoposition.coords.latitude,
      lng: geoposition.coords.longitude
    }
  }

  private startWatchLocation() {
    this.watchSubscription =
      this.geolocation.watchPosition({timeout: 5000})
        .filter((p) => p.coords !== undefined)
        .subscribe((pos) => {
          this.lastKnownPosition = pos;
          this.onLocationChanged.next(pos);
        }, (err) => {
          console.error('Error while watching position: ' + err);
        });
  }

  private stopWatchLocation() {
    if (this.watchSubscription)
      this.watchSubscription.unsubscribe();
  }
}
