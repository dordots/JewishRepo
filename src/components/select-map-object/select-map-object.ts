import { Component } from '@angular/core';

@Component({
  selector: 'fk-select-map-object',
  templateUrl: 'select-map-object.html'
})
export class SelectMapObjectComponent {

  text: string;

  constructor() {
    console.log('Hello SelectMapObjectComponent Component');
    this.text = 'Hello World';
  }

}
