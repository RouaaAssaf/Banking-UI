import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TransactionService, TransactionRequest } from '../../../core/services/transaction.service';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-transaction-add',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.scss']
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
      transactionType: [0, Validators.required], // 0 = Credit, 1 = Debit
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
        this.snackBar.open(`Error: ${err.error?.message || 'Failed to add transaction'}`, 'Close', { duration: 4000 });
      }
    });
  }
}
