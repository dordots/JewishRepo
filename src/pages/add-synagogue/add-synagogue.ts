import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Synagogue} from "../../models/synagogue/synagogue";

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
              private formBuilder: FormBuilder) {
    this.synagogueFormGroup = this.createSynagogueValidator();
    this.synagogue = this.createEmptySynagogue();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddSynagoguePage');
  }

  createSynagogueValidator(){
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      location: ['', [Validators.required]],
    });
  }

  createEmptySynagogue(): Synagogue{
    return {
      name: null,
      location: {latLng: null, accessibilityOptions: []},
      events: [],
      services: []
    }
  }

  submitNewSynagogue(){
    console.log(this.synagogue);
  }
}
