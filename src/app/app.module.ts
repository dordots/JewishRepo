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
import {GoogleMapProvider} from "../providers/google-map/google-map-provider";
import {AddEventModalComponent} from "../components/add-event-modal/add-event-modal";

function googleMapProviderFactory(provider: GoogleMapProvider){
  return () => {
    provider.loadAPI().then(()=> Promise.resolve()).catch(()=>Promise.resolve());
  }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp,{scrollPadding: false}),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
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
    GoogleMapProvider,
    {provide: APP_INITIALIZER, useFactory: googleMapProviderFactory, deps: [GoogleMapProvider], multi: true},
  ]
})
export class AppModule {}
