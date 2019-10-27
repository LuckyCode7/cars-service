import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject, BehaviorSubject } from 'rxjs';
import { Car } from './models/car';

@Injectable({ providedIn: 'root' })
export class CarsStateService {

  private subject = new BehaviorSubject<Car[]>([]);

  shareCarsList(cars: Car[]) : void {
    this.subject.next(cars);
  }

  getCarsList() : Observable<Car[]> {
    return this.subject.asObservable();
  }
}