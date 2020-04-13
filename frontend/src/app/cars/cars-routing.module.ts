import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarDetailsComponent } from './car-details/car-details.component';
import { CarResolve } from './car-resolve.service';
import { AddCarComponent } from './add-car/add-car.component';
import { StatsComponent } from './stats/stats.component';


const routes: Routes = [
  {
    path: 'cars/:id',
    component: CarDetailsComponent,
    resolve: { car: CarResolve }
  },
  {
    path: 'create',
    component: AddCarComponent
  },
  {
    path: 'stats',
    component: StatsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CarsRoutingModule { }
