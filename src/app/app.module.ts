import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CarsModule } from './cars/cars.module';
import { HttpClientModule } from '@angular/common/http';


import { CoreModule } from './core-module/core.module';
import { CarsRoutingModule } from './cars/cars-routing.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarsModule,
    CoreModule,
    HttpClientModule,
    AppRoutingModule,
    CarsRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
