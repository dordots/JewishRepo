import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SynagogueDetailsPage } from './synagogue-details';
import {PipesModule} from "../../pipes/pipes.module";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    SynagogueDetailsPage
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(SynagogueDetailsPage),
    ComponentsModule
  ],
})
export class SynagogueDetailsPageModule {}
