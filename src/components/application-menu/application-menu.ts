import {Component, Input} from '@angular/core';
import {Nav} from "ionic-angular";
import {AddSynagoguePage} from "../../pages/add-synagogue/add-synagogue";

declare type PagesDictionary = { [componentName: string]: { title: string, componentName: string, args?: any } }

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
    this.pages.SynagogueDetails = {title: "פרטי בית כנסת", componentName: "SynagogueDetailsPage"};
  }

  getPagesTitle() {
    return Object.keys(this.pages).map(compName => this.pages[compName]);
  }

  changePage(page: { title: string, componentName: string, args?: any }) {
    // do change page
    this.applicationContentNav.push(page.componentName, page.args || {}, {
      animation: 'transition',
      animate: true,
      duration: 500,
      direction: 'forward'
    })
  }
}
