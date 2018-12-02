import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchEventPage } from './search-event';
import {ComponentsModule} from "../../components/components.module";
import {DirectivesModule} from "../../directives/directives.module";
import {SearchResultsViewComponent} from "../../components/search-results-view/search-results-view";

@NgModule({
  declarations: [
    SearchEventPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchEventPage),
    ComponentsModule,
    DirectivesModule
  ],
  entryComponents: [SearchResultsViewComponent]
})
export class SearchEventPageModule {}
