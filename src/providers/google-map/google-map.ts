import {merge} from "lodash-es";
import {Geolocation, GeolocationOptions, Geoposition} from "@ionic-native/geolocation";
import {Subscription} from "rxjs/Subscription";
import "rxjs/add/observable/interval";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/take";
import {ApplicationMapObject, EventBasedMapObject} from "../../common/models/map-objects/map-objects";
import {AppAssetsProvider} from "../app-assets/app-assets";
import {InfoWindow} from "./info-window";

export class GoogleMap {
  private markers: google.maps.Marker[];
  private circles: google.maps.Circle[];
  private infoWindows: InfoWindow[];
  private locationMarker: google.maps.Marker;
  private locationCircle: google.maps.Circle;
  private locationTrackingSubscription: Subscription;

  public lastKnownPosition: Geoposition;
  get lastKnownLatLng(){return this.coordToLatLngLiteral(this.lastKnownPosition)}

  constructor(public map: google.maps.Map,
              public readonly geolocation: Geolocation,
              private appAssetsProvider: AppAssetsProvider) {
    this.markers = [];
    this.circles = [];
    this.infoWindows = [];
  }

  dispose() {
    this.disableLocationTracking();
    google.maps.event.clearInstanceListeners(this);
    this.markers.forEach(m => m.setMap(null));
    this.circles.forEach(c => c.setMap(null));
    this.infoWindows.forEach(iw => iw.dispose());
    this.circles = null;
    this.markers = null;
    this.infoWindows = null;
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

  async drawEventBasedMapObject(mapObject: EventBasedMapObject): Promise<{marker: google.maps.Marker, infoWindow: InfoWindow}> {
    let iconUrl = await this.appAssetsProvider.getIconPath(mapObject.type);
    let markerParams = {
      map: this.map,
      latLng: mapObject.latLng,
      options: {
        icon: {
          url: iconUrl,
          scaledSize: new google.maps.Size(30, 30)
        } as google.maps.Icon
      }
    };
    let marker = this.createMarkerAt(markerParams.latLng, markerParams.options);
    let infoWindow = new InfoWindow(mapObject, marker)
    this.infoWindows.push(infoWindow);
    return {marker, infoWindow};
  }

  async drawSimpleMapObjects(mapObjects: ApplicationMapObject[]): Promise<google.maps.Marker[]> {
    let markerParams = await Promise.all(mapObjects.map(async obj => ({
      map: this.map,
      latLng: obj.latLng,
      options: {
        icon: {
          url: await this.appAssetsProvider.getIconPath(obj.type),
          scaledSize: new google.maps.Size(30, 30)
        } as google.maps.Icon
      },
    })));
    return markerParams.map(params => this.createMarkerAt(params.latLng, params.options));
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
      center: this.lastKnownLatLng,
      radius: 10,
      visible: true
    });
  }

  private initMarker() {
    this.locationMarker = new google.maps.Marker({
      clickable: false,
      position: this.lastKnownLatLng,
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
