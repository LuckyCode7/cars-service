import { Component, OnInit, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { Car } from '../models/car';
import { CarsService } from '../cars.service';
import { Router } from '@angular/router';
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
export class CarsListComponent implements OnInit {
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  totalCosts: number;
  grossCost: number;
  cars: Car[];
  carsCopy: Car[];
  showSpinner: boolean = true;

  constructor(private carsService: CarsService,
    private carsStateService: CarsStateService,
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.loadCars();
  }

  loadCars(): void {
    this.carsService.getCars().subscribe(cars => {
      this.cars = cars;
      this.carsCopy = cars;
      this.shareCarsList();
      this.showSpinner = false;
    });
  }

  shareCarsList(): void {
    this.carsStateService.shareCarsList(this.cars);
  }

  goToCarDetails(car: Car) {
    this.router.navigate(['/cars', car.id]);
  }

  onShownGross(grossCost: number): void {
    this.grossCost = grossCost;
  }

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
}
