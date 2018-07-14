import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BasicEventQuery} from "../../models/query-forms/basic-event-query";
import {SearchableEvent, SearchableEvents} from "../../models/event/event";
import {LocationPickerComponent} from "../../components/location-picker/location-picker";

@IonicPage()
@Component({
  selector: 'page-search-event',
  templateUrl: 'search-event.html',
})
export class SearchEventPage {

  basicEventQuery: BasicEventQuery;
  eventFormGroup: FormGroup;
  searchableEvents: Array<SearchableEvent>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalCtrl: ModalController,
              public formBuilder: FormBuilder) {
    this.basicEventQuery = {} as any;
    this.searchableEvents = SearchableEvents;
    this.initEventFormGroup();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchEventPage');
  }

  private initEventFormGroup() {
    this.eventFormGroup = this.formBuilder.group({
      eventType: ['', [Validators.required]],
      location: ['', [Validators.required]]
    });
  }

  openLocationPicker() {
    let coordsPickerModal = this.modalCtrl.create(LocationPickerComponent, {}, {
      enterAnimation: 'modal-md-slide-in'
    });

    coordsPickerModal.onDidDismiss((latLng) => {
      if (latLng) {
        this.eventFormGroup.controls["location"].setValue(latLng);
        console.log(latLng);
      }
    });
    coordsPickerModal.present().then(value => {
      console.log("end");
    });
  }

  // private initPlaceAutocompleteOptions() {
  //   this.placeAutocompleteOptions = {
  //     types: ['address'],
  //     componentRestrictions: {country: 'IL'}
  //   } as any;
  // }
}
