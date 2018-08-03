import {DatePipe} from "@angular/common";

export interface Event {
  title: string;
  startTime: Date;
  endTime: Date;
  repeatedDays: number[]
}

export function FormatTimeRange(datePipe: DatePipe, startTime: Date, endTime: Date){
  let formatted = '';
  if (isValidDate(startTime))
    formatted = datePipe.transform(startTime, 'shortTime');
  if (isValidDate(endTime))
    formatted += ` - ${datePipe.transform(endTime, 'shortTime')}`;
  return formatted;
}

export function FormatDaysArray(days: number[]){
  if (days.length == 1)
    return days;
  let arr = days.slice().sort();
  let prev = arr[0];
  if (arr.every(day => {
    let isLessThanNext = day - prev <= 1;
    prev = day;
    return isLessThanNext;
  }))
    return `${arr[0]} - ${arr[arr.length-1]}`;
  else {
    return arr.join(', ');
  }
}

function isValidDate(d) {
  return d instanceof Date && !isNaN(d as any);
}
