import {Location} from "../location";
import {Events, RepeatedPeriod} from "../all-enums";

export interface SearchableEvent {
  title: Events;
  searchComponentType: any
}

export const SearchableEvents: Array<SearchableEvent> = [
  {title: Events.Prayer, searchComponentType: null}
];

export abstract class Event {
  title: string;
  date: EventDate;
  location: Location;
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
