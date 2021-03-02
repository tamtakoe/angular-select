# AngularSelect (WIP)
Angular wrapper for base-select

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

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build angular-select` to build the project. The build artifacts will be stored in the `dist/angular-select` directory.

## Publishing

After building your library with `ng build angular-select`, go to the dist folder `cd dist/angular-select` and run `npm publish`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
