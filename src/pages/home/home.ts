import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {SearchEventPage} from "../search-event/search-event";
import {AddSynagoguePage} from "../add-synagogue/add-synagogue";
import {NoScrollDirective} from "../../directives/no-scroll/no-scroll";
import {Observable} from "rxjs/Observable";
import {FakeLatLngAround, FakeMapObject} from "../../common/data-faker/data-randomizer";
import {EventBasedMapObjectProvider} from "../../providers/server-providers/event-based-map-object.provider";
import {EventBasedMapObject} from "../../common/models/map-objects/map-objects";
import {of} from "rxjs/observable/of";
import {LocationTrackingProvider} from "../../providers/location-tracking/location-tracking";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [NoScrollDirective]
})
export class HomePage {

  public nearMapObjects: Observable<EventBasedMapObject[]>;

  constructor(public navCtrl: NavController,
              private locationTracking: LocationTrackingProvider,
              private mapObjectProvider: EventBasedMapObjectProvider,
              private navParams: NavParams) {
    this.nearMapObjects = this.locationTracking.onLocationChanged.take(1).flatMap(res => {
      const myLocation = this.locationTracking.geopositionToLatLngLiteral(res);
      return this.mapObjectProvider.getAllInRadius(myLocation,10);
    });
  }

  goToSearchPage() {
    this.navCtrl.push(SearchEventPage)
  }

  goToAddSynagoguePage() {
    this.navCtrl.push(AddSynagoguePage)
  }

}
