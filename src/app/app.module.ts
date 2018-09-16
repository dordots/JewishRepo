import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ComponentsModule} from "../components/components.module";
import {AppConfigProvider} from '../providers/app-config/app-config';
import {Geolocation} from "@ionic-native/geolocation";
import {LocationPickerComponent} from "../components/location-picker/location-picker";
import {ImagePicker} from "@ionic-native/image-picker";
import {EventBasedMapObjectProvider} from '../providers/server-providers/event-based-map-object.provider';
import {HttpClientModule} from "@angular/common/http";
import {AppAssetsProvider} from '../providers/app-assets/app-assets';
import {AddEventModalComponent} from "../components/add-event-modal/add-event-modal";
import {initializeGoogleMaps, initializeUserGeoposition} from "./app-initializers";
import {GoogleMapProvider} from "../providers/google-map/google-map-provider";
import {SynagogueDetailsPage} from "../pages/synagogue-details/synagogue-details";
import {SynagogueDetailsPageModule} from "../pages/synagogue-details/synagogue-details.module";
import {SearchEventPageModule} from "../pages/search-event/search-event.module";
import { LocationTrackingProvider } from '../providers/location-tracking/location-tracking';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ComponentsModule,
    SynagogueDetailsPageModule,
    SearchEventPageModule,
    IonicModule.forRoot(MyApp, {scrollPadding: false}),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SynagogueDetailsPage,
    LocationPickerComponent,
    AddEventModalComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    ImagePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppConfigProvider,
    EventBasedMapObjectProvider,
    AppAssetsProvider,
    {provide: APP_INITIALIZER, useFactory: initializeGoogleMaps, multi: true},
    GoogleMapProvider,
    {provide: APP_INITIALIZER, useFactory: initializeUserGeoposition, deps: [GoogleMapProvider], multi: true},
    LocationTrackingProvider,
  ]
})
export class AppModule {
}
