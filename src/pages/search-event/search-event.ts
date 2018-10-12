import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, TextInput} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {SearchEvent} from "../../common/models/event/search-event";
import {PlaceAutoComplete} from "../../directives/place-autocomplete/place-autocomplete";
import {MapObject} from "../../common/models/map-objects/map-objects";
import {EventBasedMapObjectProvider} from "../../providers/server-providers/event-based-map-object.provider";
import {LocationTrackingProvider} from "../../providers/location-tracking/location-tracking";
import {SearchResultsViewComponent} from "../../components/search-results-view/search-results-view";
import {cloneDeep} from "lodash-es";

@IonicPage()
@Component({
  selector: 'page-search-event',
  templateUrl: 'search-event.html',
})
export class SearchEventPage {

  @ViewChild('placeAutoCompleteInput') placeAutoCompleteInput: TextInput;
  @ViewChild(PlaceAutoComplete) placeAutoComplete: PlaceAutoComplete;

  searchEvent: SearchEvent;
  @ViewChild('form') form: NgForm;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private locationProvider: LocationTrackingProvider,
              private mapObjectProvider: EventBasedMapObjectProvider) {
    this.searchEvent = new SearchEvent();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchEventPage');
  }

  onModalClosed(mapObject: MapObject) {
    if (!mapObject || !mapObject.isFullyValid())
      return;
    this.onMapObjectChanged(mapObject);
    this.placeAutoComplete.mapObject = mapObject;
    this.placeAutoCompleteInput._native.nativeElement.value = this.searchEvent.mapObject.userFriendlyAddress;
  }

  onMapObjectChanged(mapObject: MapObject) {
    if (!mapObject || !mapObject.isFullyValid())
      return;
    this.searchEvent.mapObject = mapObject;
  }

  isFormValid() {
    // let isMapObjectValid = StaticValidators.IsLocationValid(this.searchEvent.mapObject, false);
    return /*isMapObjectValid && */ this.form.valid;
  }

  async search() {
    let search = cloneDeep(this.searchEvent);
    if (!search.mapObject.isPartiallyValid()) {
      if (this.locationProvider.lastKnownLatLng == null) {
        this.alertCtrl.create({message: 'לא ניתן לזהות את מיקומך. יש להזין כתובת לחיפוש'}).present();
      }
      search.mapObject.latLng = this.locationProvider.lastKnownLatLng;
    }
    delete search.mapObject.userFriendlyAddress;
    try {
      const res$ = this.mapObjectProvider.getByQuery(search);
      this.navCtrl.push(SearchResultsViewComponent, {
        results: res$.map(res => res),
        mapOptions: {
          center: search.mapObject.latLng
        } as google.maps.MapOptions
      });
      console.log(await res$.toPromise());
    } catch (e) {
      console.log(e);
    }
  }
}
