import {Injectable} from '@angular/core';
import {Geolocation} from "@ionic-native/geolocation";
import {merge} from "lodash";
import {AppAssetsProvider} from "../app-assets/app-assets";
import {ServerMapObject} from "../../common/models/map-objects/server-map-object";
import {Subject} from "rxjs/Subject";
import GoogleMapsLoader = require("google-maps");
import MapOptions = google.maps.MapOptions;
import Map = google.maps.Map;
import MarkerOptions = google.maps.MarkerOptions;
import Marker = google.maps.Marker;
import LatLngLiteral = google.maps.LatLngLiteral;

// import Size = google.maps.Size;

@Injectable()
export class GoogleMapProvider {
  public isApiLoaded: boolean;
  public apiLoaded$: Subject<void>;

  constructor(private geolocation: Geolocation,
              private appAssets: AppAssetsProvider) {
    console.log('Hello GoogleMapProvider Provider');
    this.apiLoaded$ = new Subject<void>();
  }

  loadAPI(): Promise<void> {
    if (this.isApiLoaded)
      return;
    GoogleMapsLoader.KEY = "AIzaSyBCptJVdxT9qytWXFkm4cVfXa6qdDWOncI";
    GoogleMapsLoader.LANGUAGE = 'he';
    GoogleMapsLoader.REGION = 'IL';
    GoogleMapsLoader.LIBRARIES = ['places'];
    return new Promise<void>(resolve => GoogleMapsLoader.load(() => {
      this.apiLoaded$.next();
      resolve();
    }));
  }

  get mapOptions(): MapOptions {
    return {
      center: {
        lat: 43.0741,
        lng: -89.38098
      },
      zoom: 18,
      tilt: 30
    }
  }

  async createMap(mapDivElement: HTMLDivElement): Promise<Map> {
    if (!this.isApiLoaded) {
      await this.loadAPI();
      this.isApiLoaded = true;
    }
    return new google.maps.Map(mapDivElement, this.mapOptions);
  }

  async getCurrentPosition() {
    return await this.geolocation.getCurrentPosition();
  }

  createMarkerAt(map: Map, latLng: LatLngLiteral, options: Partial<MarkerOptions> = {}) {
    let markerOptions = merge({position: latLng, map: map}, options);
    return new google.maps.Marker(markerOptions);
  }

  async drawMapObjects(map: Map, mapObjects: ServerMapObject[]): Promise<Marker[]> {
    let markerParams = await Promise.all(mapObjects.map(async obj => ({
      map: map,
      latLng: obj.latLng,
      options: {
        icon: {
          url: await this.appAssets.getIconPath(obj.type),
          scaledSize: new google.maps.Size(30,30)
        } as google.maps.Icon
      },
    })));
    return markerParams.map(params => this.createMarkerAt(map, params.latLng, params.options));
  }
}
