// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';


// Standalone Pipes & Directives
import { TransactionIconPipe } from './pipes/transaction-icon.pipe';
import { TransactionColorPipe } from './pipes/transaction-color.pipe';
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';
import { HighlightDirective } from './directives/highlight.directive';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatListModule,
    MatProgressBarModule,
    RouterModule,
    FormsModule,  

    // Standalone Pipes/Directives should go here in imports
    TransactionIconPipe,
    TransactionColorPipe,
    CurrencyFormatPipe,
    HighlightDirective
  ],
  exports: [
    // export modules and standalone pipes/directives
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSidenavModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatListModule,
    MatProgressBarModule,
    TransactionIconPipe,
    TransactionColorPipe,
    CurrencyFormatPipe,
    HighlightDirective,
    RouterModule,
    FormsModule,  
  ]
})
export class SharedModule {}
