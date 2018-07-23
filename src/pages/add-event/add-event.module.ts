import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEventPage } from './add-event';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    AddEventPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEventPage),
    ComponentsModule
  ],
})
export class AddEventPageModule {}
