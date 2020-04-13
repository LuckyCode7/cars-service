import { Component, OnInit } from '@angular/core';
import { CarsService } from '../cars.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../models/car';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'cs-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.less']
})
export class CarDetailsComponent implements OnInit {
  car: Car;
  carForm : FormGroup;

  constructor(private carsService: CarsService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder : FormBuilder,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.loadCar();
    this.carForm = this.buildCarForm();
  }

  loadCar() {
    this.car = this.route.snapshot.data['car']; 
  }

  updateCar(): void {
    this.carsService.updateCar(this.car.id, this.carForm.value).subscribe(
      (car) => {
      this.router.navigate(['/cars']);
      this.toastr.info(`Updated ${car.model}`, 'Success');
    });
  }

  buildCarForm() {
    return this.formBuilder.group({
      model: [this.car.model, Validators.required],
      type: this.car.type,
      plate: [this.car.plate, [Validators.required, Validators.minLength(3), Validators.maxLength(7)]],
      deliveryDate: [this.car.deliveryDate, Validators.required],
      deadline: [this.car.deadline, Validators.required],
      color: this.car.color,
      power: this.car.power,
      year: [this.car.year, [Validators.required,  Validators.pattern(/\d{4}/)]],
      clientFirstname: [this.car.clientFirstname, [Validators.required,  Validators.pattern(/^[a-zA-Z]+$/)]],
      clientSurname: [this.car.clientSurname, [Validators.required,  Validators.pattern(/^[a-zA-Z]+$/)]],
      cost: [this.car.cost, [Validators.required, Validators.pattern(/^(\d*\.)?\d+$/)]],
      isFullyDamaged: this.car.isFullyDamaged
    })
  }  
}
