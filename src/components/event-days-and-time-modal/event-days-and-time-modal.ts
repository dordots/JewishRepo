import {Component} from '@angular/core';
import {Event} from "../../common/models/event/event";
import {FormBuilder, FormGroup} from "@angular/forms";
import {StaticValidators} from "../../validators/static-validators";
import {DatePipe} from "@angular/common";
import {ViewController} from "ionic-angular";
import moment = require("moment");

@Component({
  selector: 'fk-event-days-and-time-modal',
  templateUrl: 'event-days-and-time-modal.html',
  providers: [DatePipe]
})
export class EventDaysAndTimeModalComponent {

  event: Event;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private datePipe: DatePipe,
              private viewCtrl: ViewController) {
    console.log('Hello EventDaysAndTimeModalComponent Component');
    this.event = {} as any;
    this.event.title = 'תפילה';
    this.event.repeatedDays = [];
    this.form = this.buildForm();
  }

  buildForm(){
    return this.formBuilder.group({
      startsAt: ['', [StaticValidators.ValidDate('HH:mm'),
                      StaticValidators.ValidDateIsBefore(()=>this.event.endTime,"HH:mm")]],
      endsAt: ['', [StaticValidators.ValidDateIsAfter(()=>this.event.startTime,"HH:mm")]],
      repeatedDays: ['', [StaticValidators.ArrayLengthInRange(1,8)]]
    });
  }

  onFormSubmitted(){
    this.event.startTime = moment(this.event.startTime, "HH:mm").toDate();
    this.event.endTime = this.event.endTime && moment(this.event.endTime, "HH:mm").toDate();
    this.viewCtrl.dismiss(this.event);
    console.log(this.event);
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  formatTimeRange(event: Event){
    return event.formatTimeRange(this.datePipe);
  }
}
