import {ChangeDetectorRef, Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Synagogue} from "../../common/models/map-objects/synagogue";
import {MapObject, ServerMapObject} from "../../common/models/map-objects/server-map-object";
import {ImagePicker, ImagePickerOptions, OutputType} from "@ionic-native/image-picker";
import {EventBasedMapObjectProvider} from "../../providers/server-providers/event-based-map-object.provider";
import {EventDaysAndTimeModalComponent} from "../../components/event-days-and-time-modal/event-days-and-time-modal";
import {Event, FormatDaysArray, FormatTimeRange} from "../../common/models/event/event";
import {DatePipe} from "@angular/common";
import {PrintFormValidationErrors} from "../../common/models/common/utils";
import {StaticValidators} from "../../validators/static-validators";
// import {StaticValidators} from "../../validators/static-validators";
// import {PlaceAutoComplete} from "../../directives/place-autocomplete/place-autocomplete";

@IonicPage()
@Component({
  selector: 'page-add-synagogue',
  templateUrl: 'add-synagogue.html',
  providers: [DatePipe]
})
export class AddSynagoguePage {

  phoneNumber: string;
  synagogueFormGroup: FormGroup;
  synagogue: Synagogue;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private imagePicker: ImagePicker,
              private mapObjectProvider: EventBasedMapObjectProvider,
              private datePipe: DatePipe,
              private modalCtrl: ModalController) {
    this.synagogue = new Synagogue();
    this.synagogueFormGroup = this.createSynagogueValidator();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddSynagoguePage');
  }

  createSynagogueValidator(){
    let group = new FormGroup({
      name: new FormControl(this.synagogue.name, [Validators.required]),
      primaryNosach: new FormControl(this.synagogue.primaryPrayerNosach, {validators: [Validators.required], updateOn: 'change'}),
      location: new FormControl(this.synagogue, {validators: StaticValidators.ValidateLocation(()=>this.synagogue), updateOn: "blur"}),
      phone: new FormControl(this.synagogue.phone, [Validators.pattern(/^\d{2,3}-?\d{7}$/)])
    }, {updateOn: "blur"});
    return group;
  }

  async submitNewSynagogue(){
    await this.mapObjectProvider.create(this.synagogue);
  }

  // onPlaceSelected(mapObject: ServerMapObject){
  //   if (mapObject == null || mapObject.userFriendlyAddress == null || mapObject.latLng == null){
  //     this.synagogue.latLng = null;
  //     this.synagogue.userFriendlyAddress = null;
  //     this.synagogueFormGroup.controls['location'].setErrors({'incorrect': true});
  //   } else {
  //     this.synagogue.latLng = mapObject.latLng;
  //     this.synagogue.userFriendlyAddress = mapObject.userFriendlyAddress;
  //     this.synagogueFormGroup.get('location').setErrors(null);
  //   }
  //   this.cd.detectChanges();
  // }

  onPlaceSelected(mapObject: MapObject){
    this.synagogue.latLng = mapObject.latLng;
    this.synagogue.userFriendlyAddress = mapObject.userFriendlyAddress;
  }

  async pickImage() {
    try {
      let imagePickerOptions = {maximumImagesCount: 1, outputType: OutputType.DATA_URL} as ImagePickerOptions;
      this.synagogue.picture = await this.imagePicker.getPictures(imagePickerOptions);
    }
    catch (e) {
      console.error(e);
    }
  }

  openAddTimesModal() {
    const modal = this.modalCtrl.create(EventDaysAndTimeModalComponent,null, {
      enableBackdropDismiss: true,
      showBackdrop: true,
    });
    modal.onDidDismiss((data: Event) => {
      if (data == null)
        return;
      this.synagogue.events.push(data);
    });
    modal.present();
  }

  addPhoneNumber(){
    if (this.synagogue.phone.findIndex(p => p == this.phoneNumber) == -1)
      this.synagogue.phone.push(this.phoneNumber);
  }

  removePhone() {
    let index = this.synagogue.phone.findIndex(p => p == this.phoneNumber);
    this.synagogue.phone.splice(index, 1);
  }

  formatTimeRange(event: Event){
    return FormatTimeRange(this.datePipe, event.startTime, event.endTime);
  }

  formatDays(event: Event){
    return FormatDaysArray(event.repeatedDays);
  }

  removeEvent(event) {
    this.synagogue.events.splice(this.synagogue.events.findIndex(ev => ev == event), 1);
  }

  printErrors() {
    PrintFormValidationErrors(this.synagogueFormGroup);
    console.log("---");
  }
}
