import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchEventPage } from './search-event';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    SearchEventPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchEventPage),
    ComponentsModule
  ]
})
export class SearchEventPageModule {}
