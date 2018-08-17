import {Component} from '@angular/core';
import {Event} from "../../common/models/event/event";
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {StaticValidators} from "../../validators/static-validators";
import {DatePipe} from "@angular/common";
import {ViewController} from "ionic-angular";
import moment = require("moment");
import {PrayerEvent} from "../../common/models/event/prayer-event";
import {EventTypes} from "../../common/models/common/enums/event-types";
import {PrintFormValidationErrors} from "../../common/models/common/utils";
import {LessonEvent} from "../../common/models/event/lesson-event";
import {PrayerTypes} from "../../common/models/common/enums/prayer-types";

@Component({
  selector: 'fk-event-days-and-time-modal',
  templateUrl: 'event-days-and-time-modal.html',
  providers: [DatePipe]
})
export class EventDaysAndTimeModalComponent {

  event: Event;
  form: FormGroup;
  eventTypes: string[];

  constructor(private formBuilder: FormBuilder,
              private datePipe: DatePipe,
              private viewCtrl: ViewController) {
    console.log('Hello EventDaysAndTimeModalComponent Component');
    this.event = {} as any;
    this.eventTypes = this.getEventTypes();
    this.form = this.buildForm();
  }

  buildForm(){
    return this.formBuilder.group({
      eventType: ['', [Validators.required]]
    });
  }

  onFormSubmitted(){
    this.event.startTime = moment(this.event.startTime, "HH:mm").toDate();
    this.event.endTime = this.event.endTime && moment(this.event.endTime, "HH:mm").toDate();
    this.viewCtrl.dismiss(this.event);
  }

  dismiss(){
    this.viewCtrl.dismiss(null);
  }

  formatTimeRange(event: Event){
    return event.formatTimeRange(this.datePipe);
  }

  getEventTypes(){
    return Object.keys(EventTypes).map(k => EventTypes[k]);
  }

  getPrayerTypes(){
    return Object.keys(PrayerTypes).map(k => PrayerTypes[k]);
  }

  getErrors(){
    return PrintFormValidationErrors(this.form);
  }

  onEventTypeSelected(type: EventTypes) {
    switch (type){
      case EventTypes.Lesson:
        this.event = new LessonEvent();
        this.form.addControl('lessonTitle', new FormControl('',[Validators.required]));
        break;
      case EventTypes.Prayer:
        this.event = new PrayerEvent();
        this.form.addControl('prayerType', new FormControl('',[Validators.required]));
        break;
    }
    this.event.repeatedDays = [];
    this.form.addControl('startsAt', new FormControl('',[StaticValidators.ValidDate('HH:mm'),
      StaticValidators.ValidDateIsBefore(()=>this.event.endTime,"HH:mm")]))
    this.form.addControl('endsAt', new FormControl('', [StaticValidators.ValidDateIsAfter(()=>this.event.startTime,"HH:mm")]));
    this.form.addControl('repeatedDays', new FormControl('',[StaticValidators.ArrayLengthInRange(1,8)]));
  }
}
