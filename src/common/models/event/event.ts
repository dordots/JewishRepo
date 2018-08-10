import {DatePipe} from "@angular/common";
import {ServerModel} from "../common/server-model";
import {merge} from "lodash-es";
import moment = require("moment");

export abstract class Event implements ServerModel{
  title: string;
  startTime: Date;
  endTime: Date;
  repeatedDays: number[];

  protected constructor() {
    this.repeatedDays = [];
  }

  public formatTimeRange(datePipe: DatePipe){
    let formatted = '';
    if (this.isValidDate(this.startTime))
      formatted = datePipe.transform(this.startTime, 'shortTime');
    if (this.isValidDate(this.endTime))
      formatted += ` - ${datePipe.transform(this.endTime, 'shortTime')}`;
    return formatted;
  }

  public formatDaysArray(){
    if (this.repeatedDays.length == 1)
      return this.formatDaysToHebrewAbbr();
    let arr = this.repeatedDays.slice().sort();
    let prev = arr[0];
    if (arr.every(day => {
      let isLessThanNext = day - prev <= 1;
      prev = day;
      return isLessThanNext;
    })) {
      let hebAbbr = this.formatDaysToHebrewAbbr(arr);
      return `${hebAbbr[0]} - ${hebAbbr[arr.length-1]}`;
    }
    else {
      return this.formatDaysToHebrewAbbr(arr).join(', ');
    }
  }

  public formatDaysToHebrewAbbr(arr?: number[]){
    return (arr || this.repeatedDays).map(d => String.fromCharCode(0x05D0 + d - 1))
  }

  fromServerModel(serverModel: any) {
    merge(this, serverModel);
    this.startTime = moment(this.startTime, 'HH:mm').toDate();
    if (this.endTime)
      this.endTime = moment(this.startTime, 'HH:mm').toDate();
  }

  toServerModel(): any {
    return this;
  }

  private isValidDate(d){
    return d instanceof Date && !isNaN(d as any);
  }
}
