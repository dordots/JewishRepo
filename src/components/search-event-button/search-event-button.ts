import { Component } from '@angular/core';
import {NavController, NavOptions} from "ionic-angular";

/**
 * Generated class for the SearchButtonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'fk-search-event-button',
  templateUrl: 'search-event-button.html'
})
export class SearchEventButtonComponent {

  constructor(private navController: NavController) {
    console.log('Hello SearchButtonComponent Component');
  }

  async goToSearchEventPage() {
    await this.navController.push('SearchEventPage',{
      animation: 'transition',
      animate: true,
      duration: 500,
      direction: 'forward'
    });
  }
}
