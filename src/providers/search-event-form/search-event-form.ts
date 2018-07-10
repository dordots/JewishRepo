import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ModalController} from "ionic-angular";

@Injectable()
export class SearchEventFormProvider {

  private genericEventForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private modalCtrl: ModalController) {
    console.log('Hello SearchEventFormProvider Provider');
  }
}
