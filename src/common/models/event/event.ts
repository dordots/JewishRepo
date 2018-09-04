import {ServerModel} from "../common/server-model";
import {assign, isEqual, merge} from "lodash-es";
import moment = require("moment");
import {EventTypes} from "../common/enums/event-types";

export abstract class Event implements ServerModel{
  type: EventTypes;
  startTime: Date;
  endTime: Date;
  repeatedDays: number[];
  verifiedRecentlyAt: Date;

  protected constructor() {
    this.repeatedDays = [];
  }

  abstract getEventName(): string;

  equals(other: Event): boolean {
    return this.type == other.type &&
      this.startTime.getTime() == other.startTime.getTime() &&
      (this.endTime != null && other.endTime != null && this.endTime.getTime() == other.endTime.getTime()) &&
      isEqual(this.repeatedDays, other.repeatedDays);
  }

  public formatTimeRange(format="hh:mm"){
    let formatted = '';
    if (this.isValidDate(this.startTime))
      formatted = moment(this.startTime).format(format);
    if (this.isValidDate(this.endTime))
      formatted += ` - ${moment(this.endTime).format(format)}`;
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
    this.getDateMembers().forEach(m => this[m] = moment(serverModel[m]).toDate());
  }

  toServerModel(): any {
    let model = assign({}, this) as any;
    this.getDateMembers().forEach(m => model[m] = this[m].getTime());
    return model;
  }

  protected getDateMembers(): string[]{
    return ['startTime','endTime', 'verifiedRecentlyAt']
  };

  private isValidDate(d){
    return d instanceof Date && !isNaN(d as any);
  }
}
