// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AppConfig} from "../../common/models/common/app-config";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {fromPromise} from "rxjs/observable/fromPromise";

@Injectable()
export class AppConfigProvider{

  private _appConfig: AppConfig;

  constructor() {
    console.log('Hello AppConfigProvider Provider');
  }

  get config(): Observable<AppConfig>{
    if (this._appConfig)
      return Observable.of(this._appConfig);
    return fromPromise(this.initAppConfig().then(_ => this._appConfig));
  }

  private async initAppConfig() {
    this._appConfig = {
      serverBaseUrl: "http://localhost:3000",
      synagogueRest: "synagogue"
    };
  }
}
