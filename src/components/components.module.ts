import {NgModule} from '@angular/core';
import {GoogleMapComponent} from './google-map/google-map';
import {GoogleMapProvider} from "../providers/google-map/google-map-provider";
import {HomeToolbarComponent} from './home-toolbar/home-toolbar';
import {IonicModule} from "ionic-angular";
import {EventsListComponent} from './events-list/events-list';
import {EventCardComponent} from './event-card/event-card';
import {LocateButtonComponent} from './locate-button/locate-button';
import {SearchEventButtonComponent} from './search-event-button/search-event-button';
import {HomeFabsComponent} from './home-fabs/home-fabs';
import {ApplicationMenuComponent} from './application-menu/application-menu';
import {PrayerVersionOptionsComponent} from './prayer-version-options/prayer-version-options';
import {LocationPickerComponent} from './location-picker/location-picker';
import {SelectMapObjectComponent} from './select-map-object/select-map-object';
import {DayRangeComponent} from './day-range/day-range';
import {EventDaysAndTimeModalComponent} from './event-days-and-time-modal/event-days-and-time-modal';
import {SynagogueOptionsComponent} from "./synagogue-options/synagogue-options";
import {DirectivesModule} from "../directives/directives.module";

@NgModule({
	declarations: [
	  GoogleMapComponent,
    HomeToolbarComponent,
    EventsListComponent,
    EventCardComponent,
    LocateButtonComponent,
    SearchEventButtonComponent,
    HomeFabsComponent,
    ApplicationMenuComponent,
    SynagogueOptionsComponent,
    PrayerVersionOptionsComponent,
    LocationPickerComponent,
    SelectMapObjectComponent,
    DayRangeComponent,
    EventDaysAndTimeModalComponent,
  ],
	imports: [IonicModule, DirectivesModule],
  providers: [GoogleMapProvider],
  entryComponents: [SelectMapObjectComponent],
	exports: [
	  GoogleMapComponent,
    HomeToolbarComponent,
    EventsListComponent,
    EventCardComponent,
    LocateButtonComponent,
    SearchEventButtonComponent,
    HomeFabsComponent,
    ApplicationMenuComponent,
    SynagogueOptionsComponent,
    PrayerVersionOptionsComponent,
    LocationPickerComponent,
    SelectMapObjectComponent,
    DayRangeComponent,
    EventDaysAndTimeModalComponent
  ]
})
export class ComponentsModule {}
