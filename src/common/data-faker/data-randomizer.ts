import * as fakerStatic from 'faker'
import {Event} from "../models/event/event";
import {PrayerEvent} from "../models/event/prayer-event";
import {merge, range} from "lodash-es";
import {PrayerType} from "../models/common/enums/prayer-type";
import {PrayerNosach} from "../models/common/enums/prayer-nosach";
import {LessonEvent} from "../models/event/lesson-event";
import {EventBasedMapObject} from "../models/map-objects/map-objects";
import {Synagogue} from "../models/map-objects/synagogue";
import LatLngLiteral = google.maps.LatLngLiteral;

export function FakePrayerEvent(): PrayerEvent {
  let event = new PrayerEvent();
  event.prayerType = fakerStatic.random.objectElement(PrayerType) as PrayerType;
  event.nosach = fakerStatic.random.objectElement(PrayerNosach) as PrayerNosach;
  event.startTime = fakerStatic.date.future();
  event.endTime = fakerStatic.date.future();
  event.verifiedRecentlyAt = fakerStatic.date.past();
  event.repeatedDays = range(fakerStatic.random.number({min: 1, max: 7}), 8);
  return event;
}

export function FakeLessonEvent() {
  let event = new LessonEvent();
  event.startTime = fakerStatic.date.future();
  event.endTime = fakerStatic.date.future();
  event.verifiedRecentlyAt = fakerStatic.date.past();
  event.repeatedDays = range(fakerStatic.random.number({min: 1, max: 7}), 8);
  event.title = fakerStatic.lorem.words(2);
  return event;
}

export function FakeEvent(): Event {
  return fakerStatic.random.arrayElement([FakeLessonEvent, FakePrayerEvent])();
}

function FakeSynagogue(mapObject: EventBasedMapObject) {
  let synagogue = new Synagogue();
  merge(synagogue, mapObject);
  synagogue.phone = [fakerStatic.phone.phoneNumberFormat()];
  synagogue.comments = fakerStatic.lorem.lines(2);
  synagogue.primaryPrayerNosach = fakerStatic.random.objectElement(PrayerNosach) as PrayerNosach;
  synagogue.picture = fakerStatic.image.city(400, 200);
  synagogue.name = fakerStatic.name.title();
  return synagogue;
}

export function FakeMapObject() {
  let mapObject = new EventBasedMapObject();
  mapObject._id = fakerStatic.random.uuid();
  mapObject.latLng = {lat: Number(fakerStatic.address.latitude()), lng: Number(fakerStatic.address.longitude())};
  mapObject.userFriendlyAddress = fakerStatic.address.streetAddress(true);
  mapObject.events = new Array<Event>(fakerStatic.random.number(10));
  mapObject.name = fakerStatic.name.title();
  for (let i = 0; i < mapObject.events.length; i++) {
    mapObject.events[i] = FakeEvent();
  }
  return fakerStatic.random.arrayElement([FakeSynagogue])(mapObject);
}

export function FakeLatLngAround(base: LatLngLiteral): LatLngLiteral {
  let minThreshold = -5e-4;
  let maxThreshold = 5e-4;
  return {
    lat: base.lat + Math.random() * (maxThreshold - minThreshold) + (minThreshold),
    lng: base.lng + Math.random() * (maxThreshold - minThreshold) + (minThreshold)
  };
}
