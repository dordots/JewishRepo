import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HomeToolbarSegments} from "../../components/home-toolbar/home-toolbar";
import {MapObject} from "../../common/models/map-objects/map-objects";
import {SearchEventPage} from "../search-event/search-event";
import {AddSynagoguePage} from "../add-synagogue/add-synagogue";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private activeSegment: HomeToolbarSegments;
  private nearMapObjects: MapObject;

  constructor(public navCtrl: NavController,
              private navParams: NavParams) {

  }

  updateActiveSegment(segment) {
    this.activeSegment = segment;
  }

  goToSearchPage() {
    this.navCtrl.push(SearchEventPage)
  }

  goToAddSynagoguePage() {
    this.navCtrl.push(AddSynagoguePage)
  }
}
