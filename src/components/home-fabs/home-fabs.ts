import {Component, Input} from '@angular/core';
import {HomeToolbarSegments} from "../home-toolbar/home-toolbar";

@Component({
  selector: 'fk-home-fabs',
  templateUrl: 'home-fabs.html'
})
export class HomeFabsComponent {

  @Input()
  activeSegment: HomeToolbarSegments;

  constructor() {
    console.log('Hello HomeFabsComponent Component');
  }

}
