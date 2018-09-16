import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HomeToolbarSegments} from "../../components/home-toolbar/home-toolbar";
import {MapObject} from "../../common/models/map-objects/map-objects";
import {SearchEventPage} from "../search-event/search-event";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private activeSegment: HomeToolbarSegments;
  private nearMapObjects: MapObject;

  constructor(public navCtrl: NavController) {

  }

  updateActiveSegment(segment) {
    this.activeSegment = segment;
  }

  goToSearchPage() {
    this.navCtrl.push(SearchEventPage)
  }
}
