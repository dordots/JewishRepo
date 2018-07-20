import {MomentRange} from "moment-range";

export interface Event {
  title: string;
  dateRange: MomentRange;
  repeatedDays: number[]
}
