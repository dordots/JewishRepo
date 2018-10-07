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
    // this.locationTracking.onLocationChanged.filter((res: Geoposition) => {
    //   if (this.prevSearchedLocation){
    //     this.prevSearchedLocation = this.locationTracking.geopositionToLatLngLiteral(res);
    //     return true;
    //   }
    //
    //   const offsetYInKm = 0.005;
    //   const offsetXInKm = 0.005;
    //   const new_latitude_top  = res.coords.latitude  + (offsetYInKm / EarthRadiusInKm) * (180 / Math.PI);
    //   const new_latitude_bottom  = res.coords.latitude  - (offsetYInKm / EarthRadiusInKm) * (180 / Math.PI);
    //   const new_longitude_right = res.coords.longitude + (offsetXInKm / EarthRadiusInKm) * (180 / Math.PI) / Math.cos(res.coords.longitude * Math.PI/180);
    //   const new_longitude_left = res.coords.longitude - (offsetXInKm / EarthRadiusInKm) * (180 / Math.PI) / Math.cos(res.coords.longitude * Math.PI/180);
    //   if (this.prevSearchedLocation.lat > new_latitude_top || this.prevSearchedLocation.lat < new_latitude_bottom ||
    //       this.prevSearchedLocation.lng > new_longitude_right || this.prevSearchedLocation.lng < new_longitude_left){
    //     this.prevSearchedLocation = this.locationTracking.geopositionToLatLngLiteral(res);
    //     return true;
    //   }
    //   return false;
    // }).flatMap(res => {
    //   const myLocation = this.locationTracking.geopositionToLatLngLiteral(res);
    //   return this.mapObjectProvider.getAllInRadius(myLocation,10);
    // }).subscribe(res => this.nearMapObjects.next(res));
  }

  ngAfterViewInit(){
    this.resultsComponent.googleMap.onMapCreated.flatMap(res => {
      const myLocation = res.map.getCenter().toJSON();
      return this.mapObjectProvider.getAllInRadius(myLocation,10);
    }).subscribe(res => this.nearMapObjects.next(res));
  }

  goToSearchPage() {
    this.navCtrl.push(SearchEventPage)
  }

  goToAddSynagoguePage() {
    this.navCtrl.push(AddSynagoguePage)
  }

}
