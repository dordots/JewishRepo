import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LocationPickerComponent} from "../../components/location-picker/location-picker";
import {SearchEvent} from "../../common/models/event/search-event";
import {StaticValidators} from "../../validators/static-validators";

@IonicPage()
@Component({
  selector: 'page-search-event',
  templateUrl: 'search-event.html',
})
export class SearchEventPage {

  searchEvent: SearchEvent;
  eventFormGroup: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalCtrl: ModalController,
              public formBuilder: FormBuilder) {
    this.eventFormGroup = this.createForm();
    this.searchEvent = new SearchEvent();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchEventPage');
  }

  private createForm() {
    return this.formBuilder.group({
      eventType: ['', [Validators.required]],
      location: ['', [Validators.required]],
      startsAt: ['', [StaticValidators.ValidDate('HH:mm'),
                      StaticValidators.ValidDateIsBefore(()=>this.searchEvent.endTime,"HH:mm")]],
      endsAt: ['', [StaticValidators.ValidDateIsAfter(()=>this.searchEvent.startTime,"HH:mm")]],
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
