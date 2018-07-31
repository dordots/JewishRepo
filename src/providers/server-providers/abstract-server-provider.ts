import {HttpErrorResponse} from "@angular/common/http";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {AppConfigProvider} from "../app-config/app-config";

export abstract class AbstractServerProvider {

  protected constructor(protected appConfig: AppConfigProvider){}

  protected makeRoute(segments: string[]){
    return segments.join('/');
  }

  protected async makeRelativeRoute(segments: string[]){
    return (await this.config()).serverBaseUrl + '/' + this.makeRoute(segments);
  }

  protected async config(){
    return this.appConfig.config.toPromise();
  }

  protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };
}
