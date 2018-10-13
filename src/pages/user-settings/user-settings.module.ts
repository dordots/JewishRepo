import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {UserSettingsPage} from './user-settings';
import {IonicStorageModule} from "@ionic/storage";

@NgModule({
  declarations: [
    UserSettingsPage,
  ],
  imports: [
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['sqlite', 'indexeddb', 'websql']
    }),
    IonicPageModule.forChild(UserSettingsPage),
  ],
})
export class UserSettingsPageModule {
}
