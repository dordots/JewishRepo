import {Component, Input} from '@angular/core';
import {EventBasedMapObject} from "../../common/models/map-objects/map-objects";
import {FakeMapObject} from "../../common/data-faker/data-randomizer";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'fk-map-objects-list',
  templateUrl: 'map-objects-list.component.html'
})
export class MapObjectsListComponent {

  @Input() mapObjects: Observable<EventBasedMapObject[]>;

  constructor() {
    console.log('Hello EventsListComponent Component');
  }

}
