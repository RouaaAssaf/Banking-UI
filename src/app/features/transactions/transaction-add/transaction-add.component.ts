import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TransactionService, TransactionRequest } from '../../../core/services/transaction.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  template: `
    <h2 mat-dialog-title>Add Transaction</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Amount</mat-label>
        <input matInput type="number" formControlName="amount" required />
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Type</mat-label>
        <mat-select formControlName="transactionType" required>
          <mat-option [value]="0">Credit</mat-option>
          <mat-option [value]="1">Debit</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Description</mat-label>
        <input matInput formControlName="description" />
      </mat-form-field>

      <div class="actions">
        <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Save</button>
        <button mat-button type="button" (click)="dialogRef.close()">Cancel</button>
      </div>
    </form>
  `,
  styles: [`
    .full-width { width: 100%; margin-bottom: 12px; }
    .actions { display: flex; justify-content: flex-end; gap: 8px; }
  `]
})
export class TransactionAddComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<TransactionAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { accountId: string }
  ) {
    this.form = this.fb.group({
      amount: ['', Validators.required],
      transactionType: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const tx: TransactionRequest = this.form.value;

    this.transactionService.addTransaction(this.data.accountId, tx).subscribe({
      next: () => {
        this.snackBar.open('Transaction added successfully', 'Close', { duration: 3000 });
        this.dialogRef.close('success');
      },
      error: (err) => {
        this.snackBar.open(`Error: ${err.error?.Message || 'Failed to add transaction'}`, 'Close', { duration: 4000 });
      }
    });
  }
}
