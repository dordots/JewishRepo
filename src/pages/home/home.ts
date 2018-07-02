import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HomeToolbarSegments} from "../../components/home-toolbar/home-toolbar";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private activeSegment: HomeToolbarSegments;

  constructor(public navCtrl: NavController) {

  }

  updateActiveSegment(segment) {
    this.activeSegment = segment;
  }
}
