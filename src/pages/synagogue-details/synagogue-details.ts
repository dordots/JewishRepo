import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Synagogue} from "../../common/models/map-objects/synagogue";
import {EventBasedMapObjectProvider} from "../../providers/server-providers/event-based-map-object.provider";
import {DatePipe} from "@angular/common";
import {FakeMapObject} from "../../common/data-faker/data-randomizer";
import {EventTypes} from "../../common/models/common/enums/event-types";
import {LessonEvent} from "../../common/models/event/lesson-event";
import {PrayerEvent} from "../../common/models/event/prayer-event";
import {AddSynagoguePage} from "../add-synagogue/add-synagogue";
import {CallNumber} from "@ionic-native/call-number";
import {GoogleMapProvider} from "../../providers/google-map/google-map-provider";
import {LocationTrackingProvider} from "../../providers/location-tracking/location-tracking";

@IonicPage()
@Component({
  selector: 'page-synagogue-details',
  templateUrl: 'synagogue-details.html',
  providers: [DatePipe, CallNumber]
})
export class SynagogueDetailsPage {

  synagogue: Synagogue;

  prayers: PrayerEvent[];
  lessons: LessonEvent[];

  isCallSupported: boolean;
  soonestPrayer: PrayerEvent;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dial: CallNumber,
              private toastCtrl: ToastController) {
    this.synagogue = this.navParams.get('mapObject') as Synagogue || FakeMapObject() as Synagogue;
    this.prayers = this.getPrayers();
    this.lessons = this.getLessons() as LessonEvent[];
    this.soonestPrayer = this.synagogue.getSoonestEvent(EventTypes.Prayer);
    this.dial.isCallSupported().then(v => {
      this.isCallSupported = true
      this.toastCtrl.create({message: 'קיימת גם קיימת', duration: 3000}).present();
      },r => {
      this.isCallSupported = false
      this.toastCtrl.create({message: 'תכונה זו לא קיימת במכשירך' + r, duration: 3000}).present();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SynagogueDetailsPage');
  }

  private getPrayers() {
    return this.synagogue.events.filter(e => e.type == EventTypes.Prayer);
  }

  private getLessons() {
    return this.synagogue.events.filter(e => e.type == EventTypes.Lesson);
  }

  goToEditPage() {
    this.navCtrl.push('AddSynagoguePage', {synagogue: this.synagogue});
  }

  getPhoneNumber(){
    return (this.synagogue.phone && this.synagogue.phone.length > 0 && this.synagogue.phone[0]) || 'לא ידוע';
  }

  async goToDial() {
    try {
      if (!this.isCallSupported) {
        this.toastCtrl.create({message: 'תכונה זו לא קיימת במכשירך', duration: 3000}).present();
        return;
      }
      try {
        await this.dial.callNumber(this.synagogue.phone[0], true);
      }
      catch (e) {
        this.toastCtrl.create({message: 'אירעה שגיאה... לא ניתן להתקשר', duration: 3000}).present();
      }
    }
    catch (e) {
      console.warn('Cordova is not available');
    }
  }


}
