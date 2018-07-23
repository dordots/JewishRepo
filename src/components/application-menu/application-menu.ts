import {Component, Input} from '@angular/core';
import {Nav, NavController} from "ionic-angular";
import {AddSynagoguePage} from "../../pages/add-synagogue/add-synagogue";

declare type PagesDictionary = {[componentName: string]: {title: string, componentName: string}}

@Component({
  selector: 'fk-application-menu',
  templateUrl: 'application-menu.html'
})
export class ApplicationMenuComponent {

  @Input()
  applicationContentNav: Nav;

  pages: PagesDictionary;

  constructor() {
    console.log('Hello ApplicationMenuComponent Component');
    this.pages = {};
    this.pages.AddSynagoguePage = {title: "הוספת בית כנסת", componentName: "AddSynagoguePage"};
    this.pages.AddEventPage = {title: "הוספת מניין", componentName: "AddEventPage"};
  }

  getPagesTitle(){
    return Object.keys(this.pages).map(compName => this.pages[compName]);
  }

  changePage(pageTitle) {
    // do change page
    this.applicationContentNav.push(pageTitle, {}, {
      animation: 'transition',
      animate: true,
      duration: 500,
      direction: 'forward'
    })
    // this.navCtrl.
  }
}
