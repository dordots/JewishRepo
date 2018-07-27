import {EventBasedMapObjectProvider} from "../../../providers/server-providers/event-based-map-object.provider";

export abstract class AbstractAddEvent {
  constructor(public mapObjectProvider: EventBasedMapObjectProvider,
              public readonly mapObjectType: any){}
}
