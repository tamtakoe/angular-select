import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'oi-angular-select';
  limit = 3;

  items = [
    { name: 'one', value: 1 },
    { name: 'two', value: 2 },
    { name: 'three', value: 3 },
    { name: 'four', value: 4 },
    { name: 'five', value: 5 },
    { name: 'six', value: 6 },
    { name: 'seven', value: 7 },
    { name: 'eight', value: 8 },
    { name: 'nine', value: 9 },
    { name: 'ten', value: 10 }
  ];

  item = [];

  options = {
    getItems: (query) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.items.filter(item => item.name.startsWith(query)));
        }, 1000)
      })
    }
  };
}
