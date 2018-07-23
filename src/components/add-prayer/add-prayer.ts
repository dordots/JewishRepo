import {Component, Input} from '@angular/core';
import {PrayerEvent} from "../../common/models/event/prayer-event";
import {Synagogue} from "../../common/models/map-objects/synagogue";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'fk-add-prayer',
  templateUrl: 'add-prayer.html'
})
export class AddPrayerComponent {

  @Input()
  synagogue: Synagogue;

  prayer: PrayerEvent;
  prayerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    console.log('Hello AddPrayerComponent Component');
    this.prayer = {} as any;
    this.initForm();
  }

  initForm(){
    this.prayerForm = this.formBuilder.group({
      "nosach": ['', [Validators.required]],
      "name": ['',[Validators.required]]
    });
  }
}
