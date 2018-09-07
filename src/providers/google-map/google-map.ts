import {merge} from "lodash-es";
import {Geolocation, GeolocationOptions, Geoposition} from "@ionic-native/geolocation";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/interval";
import {fromPromise} from "rxjs/observable/fromPromise";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/take";

export class GoogleMap {
  private markers: google.maps.Marker[];
  private circles: google.maps.Circle[];
  private locationMarker: google.maps.Marker;
  private locationCircle: google.maps.Circle;
  private locationTrackingSubscription: Subscription;

  public map: google.maps.Map;
  public lastKnownPosition: Geoposition;

  constructor(map: google.maps.Map, public readonly geolocation: Geolocation) {
    this.map = map;
    this.markers = [];
    this.circles = [];
  }

  dispose() {
    this.disableLocationTracking();
    google.maps.event.clearInstanceListeners(this);
    this.markers.forEach(m => m.setMap(null));
    this.circles.forEach(c => c.setMap(null));
    this.circles = null;
    this.markers = null;
    this.map = null;
  }

  enableLocationTracking(options?: GeolocationOptions) {
    this.initMarker();
    this.initCircle();
    this.startWatchingUserPosition(options);
  }

  disableLocationTracking() {
    if (this.locationTrackingSubscription == null || this.locationTrackingSubscription.closed)
      return;
    this.locationTrackingSubscription.unsubscribe();
    this.locationMarker.setMap(null);
    this.locationCircle.setMap(null);
  }

  private startWatchingUserPosition(options: GeolocationOptions) {
    if (this.locationTrackingSubscription != null && !this.locationTrackingSubscription.closed)
      return;

    this.locationTrackingSubscription = this.geolocation.watchPosition(options)
      .filter((p) => p.coords !== undefined).subscribe((pos) => {
        this.lastKnownPosition = pos;
        this.changeCircleAndMarkerCenter(pos);
      }, (err) => {
        console.log('In watch mode: ');
        console.log(err);
      });

  }

  createMarkerAt(latLng: google.maps.LatLngLiteral, options: Partial<google.maps.MarkerOptions> = {}) {
    let markerOptions = merge({position: latLng, map: this.map}, options);
    let marker = new google.maps.Marker(markerOptions);
    this.markers.push(marker);
    return marker;
  }

  private initCircle() {
    this.locationCircle = new google.maps.Circle({
      clickable: false,
      strokeColor: "#3a84df",
      strokeOpacity: .8,
      strokeWeight: .5,
      fillColor: "#3a84df",
      fillOpacity: .25,
      map: this.map,
      center: new google.maps.LatLng(0, 0),
      radius: 20,
      visible: true
    });
  }

  private initMarker() {
    this.locationMarker = new google.maps.Marker({
      clickable: false,
      position: new google.maps.LatLng(0, 0),
      map: this.map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 9,
        fillColor: "#3a84df",
        fillOpacity: .9,
        strokeColor: "#fff",
        strokeWeight: 4
      },
      visible: true
    });
  }

  private changeCircleAndMarkerCenter(geoposition: Geoposition) {
    const center = this.coordToLatLngLiteral(geoposition);
    this.locationMarker.setPosition(center);
    this.locationCircle.setCenter(center);
  }

  coordToLatLngLiteral(geoposition: Geoposition) {
    return {
      lat: geoposition.coords.latitude,
      lng: geoposition.coords.longitude
    }
  }
}
