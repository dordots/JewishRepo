import { EventEmitter, Injectable } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import {
  Geolocation,
  GeolocationOptions,
  Geoposition
} from "@ionic-native/geolocation";
import { Diagnostic } from "@ionic-native/diagnostic";
import "rxjs/add/operator/finally";
import { Config } from "@app/env";
import LatLngLiteral = google.maps.LatLngLiteral;

@Injectable()
export class LocationTrackingProvider {
  private watchSubscription: Subscription;
  public onLocationChanged: EventEmitter<Geoposition>;

  public lastKnownPosition: Geoposition;

  public get lastKnownLatLng(): LatLngLiteral {
    return this.geopositionToLatLngLiteral(this.lastKnownPosition);
  }

  constructor(
    private readonly geolocation: Geolocation,
    private readonly diagnostic: Diagnostic
  ) {
    this.startService();
  }

  async startService() {
    try {
      const permission = await this.diagnostic.requestLocationAuthorization();
      if (
        permission === this.diagnostic.permissionStatus.GRANTED ||
        permission === this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE
      ) {
        this.onLocationChanged = new EventEmitter<Geoposition>();
        this.startWatchLocation();
      } else if (
        permission === this.diagnostic.permissionStatus.DENIED_ALWAYS
      ) {
        this.diagnostic.switchToLocationSettings();
      }
    } catch (e) {
      if (e === "cordova_not_available") {
        this.onLocationChanged = new EventEmitter<Geoposition>();
        this.startWatchLocation();
      }
    }
  }

  async getCurrentLocation(options?: GeolocationOptions) {
    return this.lastKnownPosition;
  }

  public geopositionToLatLngLiteral(geoposition: Geoposition) {
    if (!geoposition) return null;
    return {
      lat: geoposition.coords.latitude,
      lng: geoposition.coords.longitude
    };
  }

  private startWatchLocation() {
    this.watchSubscription = this.geolocation
      .watchPosition({ timeout: Config.watchLocationIntervalInMs })
      .filter(p => p.coords !== undefined)
      .subscribe(
        pos => {
          this.lastKnownPosition = pos;
          this.onLocationChanged.emit(pos);
        },
        err => {
          console.error("Error while watching position: " + err);
        }
      );
  }

  public stopWatchLocation() {
    if (this.watchSubscription) this.watchSubscription.unsubscribe();
  }
}
