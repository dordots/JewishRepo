import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Synagogue} from "../../common/models/map-objects/synagogue";
import {MapObject} from "../../common/models/map-objects/map-object";
import {ImagePicker, OutputType} from "@ionic-native/image-picker";

@IonicPage()
@Component({
  selector: 'page-add-synagogue',
  templateUrl: 'add-synagogue.html',
})
export class AddSynagoguePage {
  synagogueFormGroup: FormGroup;
  synagogue: Synagogue;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private imagePicker: ImagePicker) {
    this.synagogueFormGroup = this.createSynagogueValidator();
    this.synagogue = {} as any;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddSynagoguePage');
  }

  createSynagogueValidator(){
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      mapObject: ['', [Validators.required]],
      primaryNosach: ['', [Validators.required]],
      phone: ['', [Validators.pattern(/^\d{2,3}-?\d{7}$/)]]
    });
  }

  submitNewSynagogue(){
    console.log(this.synagogue);
  }

  onPlaceSelected(mapObject: MapObject){
    this.synagogue.latLng = mapObject.latLng;
    this.synagogue.userFriendlyAddress = mapObject.userFriendlyAddress;
  }

  async pickImage() {
    try{
      let imagePickerOptions = {maximumImagesCount: 1, outputType: OutputType.DATA_URL};
      this.synagogue.picture = await this.imagePicker.getPictures(imagePickerOptions);
    }
    catch (e) {
      console.error(e);
    }
  }
}
