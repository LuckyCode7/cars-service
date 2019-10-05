import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsListComponent } from './cars-list/cars-list.component';
import { TotalCostComponent } from './total-cost/total-cost.component';
import { SharedModule } from '../shared-module/shared.module';
import { CarDetailsComponent } from './car-details/car-details.component';
import { RouterModule } from '@angular/router';
import { CarResolve } from './car-resolve.service';
import { LoadingSpiComponent } from './loading-spi/loading-spi.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CarsListComponent, TotalCostComponent, CarDetailsComponent, LoadingSpiComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [CarResolve],
  exports: [CarsListComponent],
})
export class CarsModule { }
