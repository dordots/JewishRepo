import {AfterViewInit, Component, EventEmitter, Output} from '@angular/core';

export type HomeToolbarSegments = 'map' | 'list';

@Component({
  selector: 'fk-home-toolbar',
  templateUrl: 'home-toolbar.html'
})
export class HomeToolbarComponent implements AfterViewInit{

  @Output()
  activeSegmentEvent: EventEmitter<HomeToolbarSegments>;

  constructor() {
    console.log('Hello HomeToolbarComponent Component');
    this.activeSegmentEvent = new EventEmitter<HomeToolbarSegments>();
  }

  ngAfterViewInit(){
    this.activeSegmentEvent.emit('map');
  }

  toggleSegment(type: HomeToolbarSegments){
    this.activeSegmentEvent.emit(type);
  }
}
