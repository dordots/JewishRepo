import {Component, ViewChild} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SearchEvent} from "../../common/models/event/search-event";
import {StaticValidators} from "../../validators/static-validators";
import {PrintFormValidationErrors} from "../../common/models/common/utils";

@IonicPage()
@Component({
  selector: 'page-search-event',
  templateUrl: 'search-event.html',
})
export class SearchEventPage {

  @ViewChild('ionInput') locationInput;

  searchEvent: SearchEvent;
  formGroup: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    this.searchEvent = new SearchEvent();
    this.formGroup = this.createForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchEventPage');
  }

  private createForm() {
    let group = new FormGroup({
      startsAt: new FormControl('', [
        StaticValidators.ValidDateIsBefore(() => this.searchEvent.endTime, "HH:mm")
      ]),
      endsAt: new FormControl([
        StaticValidators.ValidDateIsAfter(() => this.searchEvent.startTime, "HH:mm")
      ]),
    }, {updateOn: "blur"});
    return group;
  }

  onModalClosed(){
    this.locationInput._native.nativeElement.value = this.searchEvent.mapObject.userFriendlyAddress;
    this.formGroup.get('location').updateValueAndValidity();
  }

  printFormErrors() {
    PrintFormValidationErrors(this.formGroup);
  }
}
