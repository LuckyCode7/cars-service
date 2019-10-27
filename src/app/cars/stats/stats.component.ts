import { Component, OnInit, OnDestroy } from '@angular/core';
import { Car } from '../models/car';
import { CarsStateService } from '../cars-state.service';
import { Subscription } from 'rxjs';
import { Statistic } from '../models/statistic';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cs-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.less']
})
export class StatsComponent implements OnInit, OnDestroy {

  cars: Car[];
  subscription: Subscription;
  statistic: Statistic[] = [];

  faThumbtack = faThumbtack;

  constructor(private carsStateService: CarsStateService) {
    this.subscription = this.carsStateService.getCarsList().subscribe(cars => {
      if (cars) {
        this.cars = cars;
        this.createStatistic();
      }
      else {
        this.cars = [];
      }});
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createStatistic() : void {
    this.statistic.push(this.countAllCars());
    this.statistic.push(this.countDestroyedCars());
    this.statistic.push(this.countTotalCosts());
    this.statistic.push(this.countMostExpensiveService());
    this.statistic.push(this.countCheapestService());
    this.statistic.push(this.countNumberOfUniqueModels());
  }

  countAllCars() : Statistic {
    const name : string = "Total number of cars";
    const value : number = this.cars.length;

    return new Statistic(name, value);
  }

  countDestroyedCars() : Statistic {
    const name : string = "Number of destroyed cars";

    let destoyedCars : Car[] = this.cars.filter(car => {
      return car.isFullyDamaged;
    });

    const value : number = destoyedCars.length;
    const valueAsString : string = value + " (" + Math.round((value/this.countAllCars().value) * 100) + "%)";

    return new Statistic(name, valueAsString);
  }

  countTotalCosts() : Statistic {
    const name : string = "Total cost of cars";
    let value : number = 0;

    this.cars.forEach(car => {
      value += car.cost;
    });

    const valueAsString : string = value + "$";

    return new Statistic(name, valueAsString);
  }

  countMostExpensiveService() : Statistic {
    const name : string = "Most expensive service";
    let value : number = 0;

    this.cars.forEach(car => {
      if (car.cost > value) {
        value = car.cost;
      }
    });

    const valueAsString : string = value + "$";
    
    return new Statistic(name, valueAsString);
  }

  countCheapestService() : Statistic {
    const name : string = "The cheapest service";
    let value : number = this.cars[0].cost;

    this.cars.forEach(car => {
      if (car.cost < value) {
        value = car.cost;
      }
    });

    const valueAsString : string = value + "$";
    
    return new Statistic(name, valueAsString);
  }

  countNumberOfUniqueModels() : Statistic {
    const name : string = "Number of unique models";
    let value : number;
    let models : string[] = [];

    this.cars.forEach(car => {
      models.push(car.model);
    });

    value = new Set(models).size;

    return new Statistic(name, value);
  }
}
