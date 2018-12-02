import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AddSynagoguePage} from './add-synagogue';
import {ComponentsModule} from "../../components/components.module";
import {PlaceAutoComplete} from "../../directives/place-autocomplete/place-autocomplete";
import {DirectivesModule} from "../../directives/directives.module";

@NgModule({
  declarations: [
    AddSynagoguePage,
  ],
  entryComponents: [],
  imports: [
    IonicPageModule.forChild(AddSynagoguePage),
    DirectivesModule,
    ComponentsModule,
  ],
  providers: [PlaceAutoComplete]
})
export class AddSynagoguePageModule {}
