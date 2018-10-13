import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserSettingsProvider} from "../../providers/user-settings/user-settings";

interface UserSetting<T> {
  value: T;
  disabled: boolean;
}

interface UserSettings {
  rangeInHomePage: UserSetting<number>;
}

@IonicPage()
@Component({
  selector: 'page-user-settings',
  templateUrl: 'user-settings.html',
})
export class UserSettingsPage {

  currentSettings: UserSettings;
  loadProgress: Promise<void>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private settings: UserSettingsProvider) {
    this.currentSettings = {} as any;
    this.loadProgress = this.loadSettings();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserSettingsPage');
  }

  ionViewCanEnter(){
    return this.loadProgress;
  }

  async loadSettings(){
    this.currentSettings.rangeInHomePage = await this.settings.getMaxRangeInHomePage();

    this.updateStatesForEeachSetting();
  }

  updateStatesForEeachSetting(){
    Object.keys(this.currentSettings).forEach(k => this.currentSettings[k] = {
      disabled: false,
      value: this.currentSettings[k]
    })
  }

  async saveRange(range: number) {
    this.currentSettings.rangeInHomePage.disabled = true;
    try{
      await this.settings.setMaxRangeInHomePage(range);
    } catch (e) {
      console.warn(e);
    }
    this.currentSettings.rangeInHomePage.disabled = false;
  }
}
