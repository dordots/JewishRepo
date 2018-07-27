import {EventBasedMapObjectProvider} from "../../../providers/server-providers/event-based-map-object.provider";
import {EventBasedMapObject} from "../../../common/models/map-objects/server-map-object";
import {EventEmitter, Input, Output} from "@angular/core";
import {Event} from "../../../common/models/event/event";

export abstract class AbstractAddEventComponent {
  @Input()
  abstract mapObject: EventBasedMapObject;

  @Output()
  formSubmitted: EventEmitter<Event>;

  protected constructor(public mapObjectProvider: EventBasedMapObjectProvider,
              public readonly mapObjectType: any){
    this.formSubmitted = new EventEmitter<Event>();
  }
}
