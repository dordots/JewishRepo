import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LocationPickerComponent} from "../../components/location-picker/location-picker";
import {SearchEvent} from "../../common/models/event/search-event";
import {StaticValidators} from "../../validators/static-validators";
import {PrintFormValidationErrors} from "../../common/models/common/utils";
import {MapObject} from "../../common/models/map-objects/server-map-object";

@IonicPage()
@Component({
  selector: 'page-search-event',
  templateUrl: 'search-event.html',
})
export class SearchEventPage {

  searchEvent: SearchEvent;
  formGroup: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalCtrl: ModalController) {
    this.searchEvent = new SearchEvent();
    this.formGroup = this.createForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchEventPage');
  }

  private createForm() {
    let group = new FormGroup({
      name: new FormControl(''),
      prayerNosach: new FormControl('',[Validators.required]),
      location: new FormControl('', [
        StaticValidators.ValidateLocation(() => this.searchEvent.mapObject)
      ]),
      startsAt: new FormControl('', [
        StaticValidators.ValidDate('HH:mm'),
        StaticValidators.ValidDateIsBefore(() => this.searchEvent.endTime, "HH:mm")
      ]),
      endsAt: new FormControl([
        StaticValidators.ValidDateIsAfter(() => this.searchEvent.startTime, "HH:mm")
      ]),
      daysRange: new FormControl('', [Validators.minLength(1), Validators.maxLength(7)])
    }, {updateOn: "blur"});
    return group;
  }

  openLocationPicker() {
    // let coordsPickerModal = this.modalCtrl.create(LocationPickerComponent, {}, {
    //   enterAnimation: 'modal-md-slide-in'
    // });
    //
    // coordsPickerModal.onDidDismiss((latLng) => {
    //   if (latLng) {
    //     this.formGroup.controls["location"].setValue(latLng);
    //     console.log(latLng);
    //   }
    // });
    // coordsPickerModal.present().then(value => {
    //   console.log("end");
    // });
  }

  printFormErrors() {
    PrintFormValidationErrors(this.formGroup);
  }
}
