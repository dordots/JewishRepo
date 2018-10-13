import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {SearchEventPage} from "../search-event/search-event";
import {AddSynagoguePage} from "../add-synagogue/add-synagogue";
import {NoScrollDirective} from "../../directives/no-scroll/no-scroll";
import {EventBasedMapObjectProvider} from "../../providers/server-providers/event-based-map-object.provider";
import {EventBasedMapObject} from "../../common/models/map-objects/map-objects";
import {LocationTrackingProvider} from "../../providers/location-tracking/location-tracking";
import {Subject} from "rxjs/Subject";
import {SearchResultsViewComponent} from "../../components/search-results-view/search-results-view";
import LatLngLiteral = google.maps.LatLngLiteral;

const EarthRadiusInKm = 6378

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [NoScrollDirective]
})
export class HomePage {

  @ViewChild("resultsComp") resultsComponent: SearchResultsViewComponent;

  public nearMapObjects: Subject<EventBasedMapObject[]>;

  private prevSearchedLocation: LatLngLiteral;

  constructor(public navCtrl: NavController,
              private locationTracking: LocationTrackingProvider,
              private mapObjectProvider: EventBasedMapObjectProvider,
              private navParams: NavParams) {
    this.nearMapObjects = new Subject<EventBasedMapObject[]>();
  }

  ngAfterViewInit(){
    this.resultsComponent.googleMap.onMapCreated.flatMap(res => {
      const mapCenter = res.map.getCenter().toJSON();
      return this.mapObjectProvider.getAllInRadius(mapCenter,2);
    }).subscribe(res => {
      if (res.length > 0)
        this.nearMapObjects.next(res);
    });
  }

  goToSearchPage() {
    this.navCtrl.push(SearchEventPage)
  }

  goToAddSynagoguePage() {
    this.navCtrl.push(AddSynagoguePage)
  }

}
