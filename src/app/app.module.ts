import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AngularSelectModule } from '../../projects/angular-select/src/lib/angular-select.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, FormsModule, AngularSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
