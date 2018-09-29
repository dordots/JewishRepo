import {EventEmitter, Injectable} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {Geolocation, GeolocationOptions, Geoposition} from "@ionic-native/geolocation";
import LatLngLiteral = google.maps.LatLngLiteral;


@Injectable()
export class LocationTrackingProvider {

  private subscription: Subscription;

  private currentLocationPromise: Promise<Geoposition>;
  public onLocationChanged: EventEmitter<Geoposition>;
  public lastKnownPosition: Geoposition;

  public get lastKnownLatLng(): LatLngLiteral {
    return this.geopositionToLatLngLiteral(this.lastKnownPosition)
  };

  constructor(private readonly geolocation: Geolocation) {
    this.onLocationChanged = new EventEmitter<Geoposition>();
    this.getCurrentLocation({timeout: 20000, maximumAge:2419200000,  enableHighAccuracy: true}).then(async _ => {
      await this.getCurrentLocation({timeout: 5000, enableHighAccuracy: true});
      this.watchLocation();
    }, _ => this.watchLocation());
  }

  async getCurrentLocation(options?: GeolocationOptions) {
    if (this.lastKnownPosition && this.subscription && !this.subscription.closed)
      return this.lastKnownPosition;

    if (this.currentLocationPromise)
      return this.currentLocationPromise;

    const watchEnabled = this.subscription && !this.subscription.closed;

    if (watchEnabled)
      this.stopWatchLocation();

    this.currentLocationPromise = this.geolocation.getCurrentPosition(options);

    const pos = await this.currentLocationPromise;

    this.currentLocationPromise = null;

    if (JSON.stringify(this.lastKnownLatLng) !== JSON.stringify(this.geopositionToLatLngLiteral(pos)))
      this.onLocationChanged.emit(pos);
    this.lastKnownPosition = pos;

    if (watchEnabled)
      this.watchLocation();

    return pos;
  }

  public geopositionToLatLngLiteral(geoposition: Geoposition) {
    if (!geoposition)
      return null;
    return {
      lat: geoposition.coords.latitude,
      lng: geoposition.coords.longitude
    }
  }

  private watchLocation() {
    const subscribe = () => this.subscription = this.geolocation.watchPosition({enableHighAccuracy: true, timeout: 3000})
      .filter((p) => p.coords !== undefined).subscribe((pos) => {
        this.lastKnownPosition = pos;
        this.onLocationChanged.next(pos);
      }, (err) => {
        console.log('In watch mode: ');
        console.log(err);
      });

    if (this.currentLocationPromise)
      this.currentLocationPromise.then(_ => subscribe(), err => subscribe());
    else
      subscribe();
  }

  private stopWatchLocation() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }
}
