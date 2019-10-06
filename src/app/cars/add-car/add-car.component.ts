import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarsService } from '../cars.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cs-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.less'],
  providers: [CarsService]
})
export class AddCarComponent implements OnInit {
  carForm : FormGroup;

  constructor(private formBuilder: FormBuilder, private carsService: CarsService, private router: Router) { 
    
  }

  ngOnInit() {
    this.carForm = this.buildCarForm();
  }

  // loadCars(): void {
  //   this.carsService.getCars().subscribe(cars => {
  //     this.cars = cars;
  //     this.countTotalCosts();
  //     this.showSpinner = false;
  //   });
  // }

  addCar(): void {
    this.carsService.addCar(this.carForm.value).subscribe(
      (car) => {
        this.router.navigate(['/cars']);
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
      year: '',
      clientFirstName: '',
      clientSurname: '',
      cost: '',
      isFullyDamaged: ''
    })
  }

}
