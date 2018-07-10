import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddSynagoguePage } from './add-synagogue';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    AddSynagoguePage,
  ],
  imports: [
    IonicPageModule.forChild(AddSynagoguePage),
    ComponentsModule
  ],
})
export class AddSynagoguePageModule {}
