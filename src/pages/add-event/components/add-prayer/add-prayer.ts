import {Component, Input} from '@angular/core';
import {PrayerEvent} from "../../../../common/models/event/prayer-event";
import {Synagogue} from "../../../../common/models/map-objects/synagogue";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventBasedMapObjectProvider} from "../../../../providers/server-providers/event-based-map-object.provider";
import {AbstractAddEventComponent} from "../abstract-add-event-component";

@Component({
  selector: 'fk-add-prayer',
  templateUrl: 'add-prayer.html'
})
export class AddPrayerComponent extends AbstractAddEventComponent{

  @Input()
  mapObject: Synagogue;

  prayer: PrayerEvent;
  prayerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private synagogueProvider: EventBasedMapObjectProvider) {
    super(synagogueProvider, Synagogue);
    console.log('Hello AddPrayerComponent Component');
    this.prayer = {} as any;
    this.initForm();
  }

  initForm(){
    this.prayerForm = this.formBuilder.group({
      "nosach": ['', [Validators.required]],
      "name": ['',[Validators.required]],
      "startsIn": ['', [Validators.required]],
      "endsIn": ['', []]
    });
  }

  async submitPrayer(){
    console.log(this.prayerForm.getRawValue());
    /*
       todo: make sure there is no more prayer like that (distinct by all fields except name) - it's possible to have
       todo: multiple similar prayers with different names
    */
    this.formSubmitted.emit(this.prayer);
  }
}
