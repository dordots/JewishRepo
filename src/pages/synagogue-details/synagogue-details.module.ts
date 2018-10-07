import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SynagogueDetailsPage } from './synagogue-details';

@NgModule({
  declarations: [
    SynagogueDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SynagogueDetailsPage)
  ],
})
export class SynagogueDetailsPageModule {}
