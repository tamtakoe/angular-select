# AngularSelect (WIP)
Angular wrapper for [base-select](https://github.com/tamtakoe/base-select/tree/master)

## Demo
https://tamtakoe.github.io/base-select

## Install
```sh
npm install oi-angular-select
```

## Using
```js
...
import { FormsModule } from '@angular/forms';
import { AngularSelectModule } from 'oi-angular-select';

@NgModule({
  ...
  imports: [
    ..., AngularSelectModule
  ],
...
```

Example
```html
<oi-angular-select [(ngModel)]="value"
             [models]="items"
             multiple
             size="sm"
             titlePlaceholder="Select..."
             trackField="value"
             searchField="name"></oi-angular-select>
```

```js
export class AppComponent {
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

  value = [];
}
```