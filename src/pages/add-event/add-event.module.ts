import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AddEventPage} from './add-event';
import {ComponentsModule} from "../../components/components.module";
import {DynamicModule} from "ng-dynamic-component";
import {AddPrayerComponent} from "./components/add-prayer/add-prayer";

@NgModule({
  declarations: [
    AddEventPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEventPage),
    ComponentsModule,
    DynamicModule.withComponents([AddPrayerComponent])
  ],
})
export class AddEventPageModule {}
