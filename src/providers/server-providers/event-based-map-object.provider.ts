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
import {from} from "rxjs/observable/from";
import {of} from "rxjs/observable/of";

@Injectable()
export class EventBasedMapObjectProvider extends AbstractServerProvider{

  static mockedId = "5b5468974f46c65fa709efcb";

  constructor(private http: HttpClient, appConfig: AppConfigProvider) {
    super(appConfig);
    console.log('Hello EventBasedMapObjectProvider Provider');
  }

  async create<T extends ServerModel&EventBasedMapObject>(mapObject: T, retryCount=1){
    let config = await this.config();
    let postRoute = await this.makeRelativeRoute([config.mapObjectsRoute]);
    return this.http.post<T>(postRoute, mapObject.toServerModel())
                    .pipe(retry(retryCount), catchError(this.handleError)).toPromise();
  }

  async getById<T extends ServerModel&EventBasedMapObject>(id: any, type: {new(): T;}, retryCount=1): Promise<T> {
    let config = await this.config();
    let getRoute = await this.makeRelativeRoute([config.mapObjectsRoute, id]);
    return this.http.get<T>(getRoute)
                    .pipe(retry(retryCount), catchError(this.handleError))
                    .map(value => {
                      return new type().fromServerModel(value)
                    }).toPromise();
  }

  async update<T extends ServerModel&EventBasedMapObject>(model: T, retryCount=1) {
    let config = await this.config();
    let putRoute = await this.makeRelativeRoute([config.mapObjectsRoute, model._id]);
    return this.http.put<T>(putRoute, model.toServerModel())
                    .pipe(retry(retryCount), catchError(this.handleError))
                    .toPromise();
  }

  getAllInRadius(latLng: LatLngLiteral, radius: number): Observable<EventBasedMapObject[]> {
    return of(new Array(5).fill(0).map(v => FakeMapObject()).map(v => {
      v.latLng = FakeLatLngAround(latLng);
      console.log(v.latLng);
      return v;
    }));
  }
}
