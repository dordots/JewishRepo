import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Synagogue} from "../../../common/models/map-objects/synagogue";
import {AppConfigProvider} from "../../app-config/app-config";
import {AbstractServerProvider} from "../abstract-server-provider";
import {catchError, retry} from "rxjs/operators";

@Injectable()
export class ServerSynagogueProvider extends AbstractServerProvider{
  constructor(private http: HttpClient, private appConfig: AppConfigProvider) {
    super();
    console.log('Hello ServerSynagogueProvider Provider');
  }

  async createSynagogue(synagogue: Synagogue, retryCount=1){
    let config = await this.appConfig.config.toPromise();
    await this.http.post<Synagogue>(config.serverBaseUrl, synagogue)
                   .pipe(retry(retryCount), catchError(this.handleError));
    console.log(config.serverBaseUrl);
  }

  protected fromServerModel(serverModel): any {
  }

  protected toServerModel(): any {
  }
}
