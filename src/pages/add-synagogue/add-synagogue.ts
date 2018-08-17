import {Component, ViewChild} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Synagogue} from "../../common/models/map-objects/synagogue";
import {ImagePicker, ImagePickerOptions, OutputType} from "@ionic-native/image-picker";
import {EventBasedMapObjectProvider} from "../../providers/server-providers/event-based-map-object.provider";
import {Event} from "../../common/models/event/event";
import {DatePipe} from "@angular/common";
import {StaticValidators} from "../../validators/static-validators";
import {AddEventModalComponent} from "../../components/add-event-modal/add-event-modal";

@IonicPage()
@Component({
  selector: 'page-add-synagogue',
  templateUrl: 'add-synagogue.html',
  providers: [DatePipe]
})
export class AddSynagoguePage {

  @ViewChild('ionInput') locationInput;

  phoneNumber: string;
  form: FormGroup;
  synagogue: Synagogue;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private imagePicker: ImagePicker,
              private mapObjectProvider: EventBasedMapObjectProvider,
              private datePipe: DatePipe,
              private modalCtrl: ModalController) {
    this.synagogue = new Synagogue();
    this.form = this.createSynagogueValidator();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddSynagoguePage');
  }

  createSynagogueValidator(){
    let group = new FormGroup({
      name: new FormControl(this.synagogue.name, [Validators.required]),
      comments: new FormControl('', []),
      primaryNosach: new FormControl(this.synagogue.primaryPrayerNosach, {validators: [Validators.required], updateOn: 'change'}),
      location: new FormControl(this.synagogue, [StaticValidators.ValidateLocation(()=>this.synagogue)]),
      phone: new FormControl(this.synagogue.phone, [Validators.pattern(/^\d{2,3}-?\d{7}$/)])
    });
    return group;
  }

  async submitNewSynagogue(){
    await this.mapObjectProvider.create(this.synagogue);
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
    const modal = this.modalCtrl.create(AddEventModalComponent,null, {
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

  onModalClosed(){
    this.locationInput._native.nativeElement.value = this.synagogue.userFriendlyAddress;
    this.form.get('location').updateValueAndValidity();
  }

  formatTimeRange(event: Event){
    return event.formatTimeRange(this.datePipe);
  }

  removeEvent(event) {
    this.synagogue.events.splice(this.synagogue.events.findIndex(ev => ev == event), 1);
  }
}
