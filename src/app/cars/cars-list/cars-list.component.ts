import { Component, OnInit, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { Car } from '../models/car';
import { TotalCostComponent } from '../total-cost/total-cost.component';
import { CarsService } from '../cars.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.less'],
  providers: [CarsService]
})
export class CarsListComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild("totalCostRef", { static: false }) totalCostRef: TotalCostComponent;
  
  totalCosts: number;
  grossCost: number;
  cars: Car[];
  showSpinner : boolean = true;
  carForm : FormGroup;


  constructor(private carsService : CarsService, private router : Router, private formBuilder : FormBuilder) { }

  ngOnInit() {
    this.loadCars();
    this.carForm = this.buildCarForm();
  }
  ngOnChanges(){
    // this.loadCars();
  }

  ngAfterViewInit() { // emitujemy zdarzenie dziecka jak komponenty się już załadują
    //this.totalCostRef.showGross();
  }

  loadCars(): void {
    this.carsService.getCars().subscribe(cars => {
      this.cars = cars;
      this.countTotalCosts();
      this.showSpinner = false;
    });
  }

  goToCarDetails(car : Car){
    this.router.navigate(['/cars', car.id]);
  }

  countTotalCosts(): void {
    this.totalCosts = 0;
    this.cars.forEach(car => {
      this.totalCosts += car.cost;
    });
  }



  onShownGross(grossCost: number): void {
    console.log('grosscost', grossCost);
    this.grossCost = grossCost;
  }

  showGross(): void {
    this.totalCostRef.showGross();
  }

  addCar(): void {
    this.carsService.addCar(this.carForm.value).subscribe(
      (car) => {
      this.loadCars();
    });
  }

  buildCarForm() {
    return this.formBuilder.group({
    model: ['', Validators.required],
    type: '',
    plate: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(7)]],
    deliveryDate: '',
    deadline: '',
    color: '',
    power: '',
    year:'',
    clientFirstName: '',
    clientSurname: '',
    cost: '',
    isFullyDamaged: ''
    })
  }

}
