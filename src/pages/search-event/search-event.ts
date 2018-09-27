import {Component, ViewChild} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, TextInput} from 'ionic-angular';
import {Form, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {SearchEvent} from "../../common/models/event/search-event";
import {StaticValidators} from "../../validators/static-validators";
import {PrintFormValidationErrors} from "../../common/models/common/utils";
import {PlaceAutoComplete} from "../../directives/place-autocomplete/place-autocomplete";
import {MapObject} from "../../common/models/map-objects/map-objects";

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
              public navParams: NavParams) {
    this.searchEvent = new SearchEvent();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchEventPage');
  }

  onModalClosed(mapObject: MapObject){
    if (mapObject && mapObject.userFriendlyAddress) {
      this.onMapObjectChanged(mapObject);
      this.placeAutoComplete.mapObject = mapObject;
      this.placeAutoCompleteInput._native.nativeElement.value = this.searchEvent.mapObject.userFriendlyAddress;
    }
  }

  onMapObjectChanged(mapObject: MapObject){
    this.searchEvent.mapObject = mapObject;
  }

  isFormValid(){
    let isMapObjectValid = StaticValidators.IsLocationValid(this.searchEvent.mapObject, false);
    return isMapObjectValid && this.form.valid;
  }

  printFormErrors() {
    PrintFormValidationErrors(this.form);
  }
}
