# AngularSelect (WIP)
Angular wrapper for base-select

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.3.

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

## Code scaffolding

Run `ng generate component component-name --project AngularSelect` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project AngularSelect`.
> Note: Don't forget to add `--project AngularSelect` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build AngularSelect` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build AngularSelect`, go to the dist folder `cd dist/angular-select` and run `npm publish`.

## Running unit tests

Run `ng test AngularSelect` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
