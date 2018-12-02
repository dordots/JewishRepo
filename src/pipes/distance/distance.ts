import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distancePipe',
})
export class DistancePipe implements PipeTransform {

  transform(distance: number, ...args) {
    if (isNaN(distance) || distance == -1)
      return 'לא ידוע מרחק יחסי';
    if (distance >= 1000)
      return (distance / 1000).toFixed(2) + ' km';
    return distance + ' m';
  }
}
