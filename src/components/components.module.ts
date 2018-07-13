import { NgModule } from '@angular/core';
import { GoogleMapComponent } from './google-map/google-map';
import {GoogleMapProvider} from "../providers/google-map/google-map";
import { HomeToolbarComponent } from './home-toolbar/home-toolbar';
import {IonicModule} from "ionic-angular";
import { EventsListComponent } from './events-list/events-list';
import { EventCardComponent } from './event-card/event-card';
import { LocateButtonComponent } from './locate-button/locate-button';
import { SearchEventButtonComponent } from './search-event-button/search-event-button';
import { HomeFabsComponent } from './home-fabs/home-fabs';
import { ApplicationMenuComponent } from './application-menu/application-menu';
import { AccessibilityOptionsComponent } from './accessibility-options/accessibility-options';
import { PrayerVersionOptionsComponent } from './prayer-version-options/prayer-version-options';

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
    AccessibilityOptionsComponent,
    PrayerVersionOptionsComponent
  ],
	imports: [IonicModule.forRoot(HomeToolbarComponent)],
  providers: [GoogleMapProvider],
	exports: [
	  GoogleMapComponent,
    HomeToolbarComponent,
    EventsListComponent,
    EventCardComponent,
    LocateButtonComponent,
    SearchEventButtonComponent,
    HomeFabsComponent,
    ApplicationMenuComponent,
    AccessibilityOptionsComponent,
    PrayerVersionOptionsComponent
  ]
})
export class ComponentsModule {}
