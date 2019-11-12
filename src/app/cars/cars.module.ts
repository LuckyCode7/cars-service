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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddCarComponent } from './add-car/add-car.component';
import { StatsComponent } from './stats/stats.component';
import { CarsStateService } from './cars-state.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule, MatDatepickerModule, MatInputModule,MatNativeDateModule} from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ConfirmDialogComponent } from '../shared-module/dialogs/confirm-dialog/confirm-dialog.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [CarsListComponent, TotalCostComponent, CarDetailsComponent, LoadingSpiComponent, AddCarComponent, StatsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    DragDropModule,
    MatDatepickerModule, 
    MatInputModule,
    MatNativeDateModule,
    ToastrModule.forRoot()
  ],
  providers: [CarResolve, CarsStateService],
  entryComponents: [ConfirmDialogComponent],
  exports: [CarsListComponent],
})
export class CarsModule { }
