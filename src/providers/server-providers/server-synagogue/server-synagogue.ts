import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Synagogue} from "../../../common/models/map-objects/synagogue";
import {AppConfigProvider} from "../../app-config/app-config";
import {AbstractServerProvider} from "../abstract-server-provider";
import {catchError, retry} from "rxjs/operators";

@Injectable()
export class ServerSynagogueProvider extends AbstractServerProvider{
  constructor(private http: HttpClient, appConfig: AppConfigProvider) {
    super(appConfig);
    console.log('Hello ServerSynagogueProvider Provider');
  }

  async createSynagogue(synagogue: Synagogue, retryCount=1){
    let config = await this.config();
    let postRoute = await this.makeRelativeRoute([config.synagogueRest]);
    return this.http.post<Synagogue>(postRoute, synagogue.toServerModel())
                    .pipe(retry(retryCount), catchError(this.handleError)).toPromise();
  }
}
