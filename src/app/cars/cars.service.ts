import { Injectable } from '@angular/core';
import { Car } from './models/car';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private protocol: string = "http";
  private domain: string = "localhost";
  private port: string = "8081";
  private url: string =
    this.protocol + "://" +
    this.domain + ":" +
    this.port;

  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]> {
    return this.http.get(`${this.url}/cars`)
      .pipe(map(res => res as Car[]));
  }

  getCar(id: number): Observable<Car> {
    return this.http.get(`${this.url}/cars/${id}`)
      .pipe(map(res => res as Car));
  }

  addCar(data) : Observable<Car>{
    return this.http.post(`${this.url}/cars`, data)
      .pipe(map(res => res as Car));
  }

  updateCar(id: number, data): Observable<Car> {
    return this.http.put(`${this.url}/cars/${id}`, data)
      .pipe(map(res => res as Car));
  }

  removeCar(id: number): Observable<Car> {
    return this.http.delete(`${this.url}/cars/${id}`)
      .pipe(map(res => res as Car));
  }
}
