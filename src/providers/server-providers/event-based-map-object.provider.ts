import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AppConfigProvider} from "../app-config/app-config";
import {AbstractServerProvider} from "./abstract-server-provider";
import {catchError, retry} from "rxjs/operators";
import "rxjs/add/operator/map";
import {ServerModel} from "../../common/models/common/server-model";
import {EventBasedMapObject} from "../../common/models/map-objects/map-objects";
import {Observable} from "rxjs/Observable";
import LatLngLiteral = google.maps.LatLngLiteral;
import {FakeLatLngAround, FakeMapObject} from "../../common/data-faker/data-randomizer";
import {of} from "rxjs/observable/of";
import {SearchEvent} from "../../common/models/event/search-event";
import {Config} from "@app/env";

@Injectable()
export class EventBasedMapObjectProvider extends AbstractServerProvider{

  readonly baseUrl = `${Config.serverBaseUrl}/synagogue`;

  constructor(private http: HttpClient, appConfig: AppConfigProvider) {
    super(appConfig);
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
    return this.http.post(`${this.baseUrl}/search`,searchEvent.toServerModel());
  }
}
