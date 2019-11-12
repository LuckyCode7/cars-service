import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SurnameShortcutPipe } from './pipes/surname-shortcut.pipe';
import { ImportantDirective } from './directives/important.directive';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { MatButtonModule, MatDialogModule } from '@angular/material';


@NgModule({
  declarations: [HeaderComponent, SurnameShortcutPipe, ImportantDirective, ConfirmDialogComponent],
  exports: [HeaderComponent, SurnameShortcutPipe, ImportantDirective, ConfirmDialogComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class SharedModule { }
