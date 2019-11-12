import { Component, OnInit, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { Car } from '../models/car';
import { TotalCostComponent } from '../total-cost/total-cost.component';
import { CarsService } from '../cars.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { CarsStateService } from '../cars-state.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/shared-module/dialogs/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.less'],
  providers: [CarsService]
})
export class CarsListComponent implements OnInit, AfterViewInit {

  @ViewChild("totalCostRef", { static: false }) totalCostRef: TotalCostComponent;
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  totalCosts: number;
  grossCost: number;
  cars: Car[];
  carsCopy: Car[];
  showSpinner: boolean = true;
  //carForm: FormGroup;


  constructor(private carsService: CarsService,
    private carsStateService: CarsStateService,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.loadCars();
    //this.carForm = this.buildCarForm();
  }

  ngAfterViewInit() { // emitujemy zdarzenie dziecka jak komponenty się już załadują
    //this.totalCostRef.showGross();
  }

  loadCars(): void {
    this.carsService.getCars().subscribe(cars => {
      this.cars = cars;
      this.carsCopy = cars;
      this.shareCarsList();
      this.countTotalCosts();
      this.showSpinner = false;
    });
  }

  shareCarsList(): void {
    this.carsStateService.shareCarsList(this.cars);
  }

  goToCarDetails(car: Car) {
    this.router.navigate(['/cars', car.id]);
  }

  countTotalCosts(): void {
    this.totalCosts = 0;
    this.cars.forEach(car => {
      this.totalCosts += car.cost;
    });
  }

  onShownGross(grossCost: number): void {
    this.grossCost = grossCost;
  }

  showGross(): void {
    this.totalCostRef.showGross();
  }

  // addCar(): void {
  //   this.carsService.addCar(this.carForm.value).subscribe(
  //     (car) => {
  //     this.loadCars();
  //   });
  // }

  removeCar(car: Car, event): void {
    event.stopPropagation();

    const message = `Are you sure you want to remove ${car.model} ?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.carsService.removeCar(car.id).subscribe(
          () => {
             this.loadCars();
             this.toastr.info(`Removed ${car.model}`, 'Success'); 
            });
      }
    });
  }

  textChange(event: any) {
    let searchCars;
    searchCars = this.carsCopy.filter(car => {
      return (car.model.toLowerCase().includes(event.target.value.toLowerCase()) ||
        car.plate.toLowerCase().includes(event.target.value.toLowerCase()) ||
        car.deliveryDate.toLowerCase().includes(event.target.value.toLowerCase()) ||
        car.deadline.toLowerCase().includes(event.target.value.toLowerCase()) ||
        car.clientSurname.toLowerCase().includes(event.target.value.toLowerCase())
      )
    });
    this.cars = searchCars;
  }

  // buildCarForm() {
  //   return this.formBuilder.group({
  //     model: ['', Validators.required],
  //     type: '',
  //     plate: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(7)]],
  //     deliveryDate: '',
  //     deadline: '',
  //     color: '',
  //     power: '',
  //     year: '',
  //     clientFirstName: '',
  //     clientSurname: '',
  //     cost: '',
  //     isFullyDamaged: ''
  //   })
  // }

}
