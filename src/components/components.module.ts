import { NgModule } from '@angular/core';
import { GoogleMapComponent } from './google-map/google-map';
import {GoogleMapProvider} from "../providers/google-map/google-map";
import { HomeToolbarComponent } from './home-toolbar/home-toolbar';
import {IonicModule} from "ionic-angular";
import { EventsListComponent } from './events-list/events-list';
import { EventCardComponent } from './event-card/event-card';
import { LocateButtonComponent } from './locate-button/locate-button';

@NgModule({
	declarations: [GoogleMapComponent, HomeToolbarComponent,
    EventsListComponent,
    EventCardComponent,
    LocateButtonComponent],
	imports: [IonicModule.forRoot(HomeToolbarComponent)],
  providers: [GoogleMapProvider],
	exports: [GoogleMapComponent,HomeToolbarComponent,
    EventsListComponent,
    EventCardComponent,
    LocateButtonComponent]
})
export class ComponentsModule {}
