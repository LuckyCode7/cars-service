import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarsService } from '../cars.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'cs-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.less'],
  providers: [CarsService]
})
export class AddCarComponent implements OnInit {
  carForm : FormGroup;

  constructor(private formBuilder: FormBuilder,
              private carsService: CarsService,
              private router: Router,
              private toastr: ToastrService) {}

  ngOnInit() {
    this.carForm = this.buildCarForm();
  }

  addCar(): void {
    this.carsService.addCar(this.carForm.value).subscribe(
      (car) => {
        this.router.navigate(['/cars']);
        this.toastr.info(`Added ${car.model}`, 'Success');
    });
  }

  buildCarForm() {
    return this.formBuilder.group({
      model: ['', Validators.required],
      type: '',
      plate: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(7)]],
      deliveryDate: ['', Validators.required],
      deadline: ['', Validators.required],
      color: '',
      power: '',
      year: ['', [Validators.required,  Validators.pattern(/\d{4}/)]],
      clientFirstname: ['', [Validators.required,  Validators.pattern(/^[a-zA-Z]+$/)]],
      clientSurname: ['', [Validators.required,  Validators.pattern(/^[a-zA-Z]+$/)]],
      cost: ['', [Validators.required, Validators.pattern(/^(\d*\.)?\d+$/)]],
      isFullyDamaged: false
    })
  }
}
