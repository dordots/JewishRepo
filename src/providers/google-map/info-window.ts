import {EventBasedMapObject} from "../../common/models/map-objects/map-objects";
import {Event} from "../../common/models/event/event";
import {EventTypes} from "../../common/models/common/enums/event-types";
import {EventEmitter} from "@angular/core";

export class InfoWindow {
  private readonly infoWindow: google.maps.InfoWindow;
  private isVisible = false;

  public onClick: EventEmitter<{event: MouseEvent, mapObject: EventBasedMapObject}>;

  constructor(private mapObject: EventBasedMapObject, marker?: google.maps.Marker) {
    this.onClick = new EventEmitter<{event: MouseEvent, mapObject: EventBasedMapObject}>();
    this.infoWindow = new google.maps.InfoWindow({content: this.createWindowContent(mapObject)});
    this.infoWindow.addListener('closeclick', () => this.isVisible = false);
    if (marker)
      this.attachToMarker(marker);
  }

  attachToMarker(marker: google.maps.Marker) {
    marker.addListener('click', () => {
      if (this.isVisible) {
        this.infoWindow.close();
        this.isVisible = false;
      }
      else {
        this.infoWindow.open(marker.getMap(), marker);
        // document.getElementById(this.mapObject._id).addEventListener('click', () => {
        //   console.log('Clicked');
        // });
        this.isVisible = true;
      }
    })
  }

  close(){
    this.infoWindow.close();
  }

  private createWindowContent(mapObject: EventBasedMapObject) {
    let soonestEvent = this.getSoonestEvent(mapObject.events, EventTypes.Prayer);
    const element = document.createElement('template');
    const timeRange = soonestEvent && soonestEvent.isTimeRangeValid() && `${soonestEvent.getEventName()} - ${soonestEvent.formatTimeRange()}`;
    element.innerHTML = `
      <div id="${mapObject._id}" class="window-info">
        <div class="window-info-header">
        <div class="window-info-image-container"><img class="window-info-image" src="https://picsum.photos/500/500"/></div>
          <div style="margin-left: 10px;text-align: right">
            <div style="font-size: 1.3em; font-weight: bold">${mapObject.name}</div>
            <div style="margin-top: 5px" dir="ltr">
              ${timeRange ? timeRange : ''}
            </div>
          </div>
          <div class="window-info-address">${mapObject.userFriendlyAddress}</div>
        </div>
      </div>
    `;
    element.content.firstElementChild.addEventListener('click', (ev: MouseEvent)=>{
      this.onClick.next({event: ev, mapObject: this.mapObject});
    });
    return element.content.firstElementChild;
  }

  private getSoonestEvent(events: Event[], type: EventTypes) {
    if (events.length == 0)
      return null;
    let sorted = events.filter(ev => ev.type == type)
      .sort((e1, e2) => e1.startTime.getTime() - e2.startTime.getTime());
    return sorted[0];
  }

  dispose() {
    this.infoWindow.setContent('');
    google.maps.event.clearInstanceListeners(this.infoWindow);
    this.mapObject = null;
    this.onClick.complete();
  }
}
