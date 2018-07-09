import {Location} from "../common/location";

export interface Event {
  title: string;
  date: EventDate;
  location: Location
}

export interface EventDate {
  startDate: Date;
  endDate: Date;
  startTime: Date;
  endTime: Date;
}

export interface RepeatedEventDate extends EventDate {
  periodType: RepeatedPeriod;
  period: number[]
}

export enum RepeatedPeriod {
  Day,
  Week,
  Month,
  Year
}
