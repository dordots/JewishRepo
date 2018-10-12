import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AbstractServerProvider} from "./abstract-server-provider";
import {catchError, retry} from "rxjs/operators";
import "rxjs/add/operator/map";
import {EventBasedMapObject} from "../../common/models/map-objects/map-objects";
import {Observable} from "rxjs/Observable";
import LatLngLiteral = google.maps.LatLngLiteral;
import {FakeLatLngAround, FakeMapObject} from "../../common/data-faker/data-randomizer";
import {of} from "rxjs/observable/of";
import {SearchEvent} from "../../common/models/event/search-event";
import {Config} from "@app/env";
import {Synagogue} from "../../common/models/map-objects/synagogue";
import {GoogleMapProvider} from "../google-map/google-map-provider";
import {LocationTrackingProvider} from "../location-tracking/location-tracking";

@Injectable()
export class EventBasedMapObjectProvider extends AbstractServerProvider{

  readonly baseUrl = `${Config.serverBaseUrl}/synagogue`;

  constructor(private http: HttpClient,
              private googleMapProvider: GoogleMapProvider,
              private locationProvider: LocationTrackingProvider) {
    super();
    console.log('Hello EventBasedMapObjectProvider Provider');
  }

  create(mapObject: EventBasedMapObject, retryCount=1){
    return this.http.post<EventBasedMapObject>(this.baseUrl, mapObject.toServerModel())
                    .pipe(retry(retryCount), catchError(this.handleError));
  }

  update(model: EventBasedMapObject, retryCount=1) {
    return this.http.put(`${this.baseUrl}/${model._id}`, model.toServerModel())
                    .pipe(retry(retryCount), catchError(this.handleError));
  }

  getAllInRadius(latLng: LatLngLiteral, radius: number): Observable<EventBasedMapObject[]> {
    return of(new Array(5).fill(0).map(v => FakeMapObject()).map(v => {
      const model = new EventBasedMapObject().fromServerModel(v);
      model.latLng = FakeLatLngAround(latLng);
      return model;
    }));
  }

  getByQuery(searchEvent: SearchEvent) {
    return this.http.post<any>(`${this.baseUrl}/search`,searchEvent.toServerModel()).map(res => {
      return res.content.map(o => new Synagogue().fromServerModel(o)) as Synagogue[];
    }).map(all => all.forEach(s => s.relativeDistanceInMeter = new Promise<number>((resolve, reject) => {
      try{
        const distance = this.googleMapProvider.getDistanceFromLatLonInKm(this.locationProvider.lastKnownLatLng, s.latLng);
        resolve(distance);
      }
      catch (e) {
        reject(e);
      }
    })));
  }
}
