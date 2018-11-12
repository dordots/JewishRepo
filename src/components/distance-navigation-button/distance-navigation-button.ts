import {Component, Input} from '@angular/core';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

@Component({
  selector: 'distance-navigation-button',
  templateUrl: 'distance-navigation-button.html'
})
export class DistanceNavigationButtonComponent {

  @Input() relativeDistance: number;
  @Input() destination: string;
  
  constructor(private launchNavigator: LaunchNavigator) { }

  launchNavigation() {
    this.launchNavigator.navigate(this.destination);
  }
}
