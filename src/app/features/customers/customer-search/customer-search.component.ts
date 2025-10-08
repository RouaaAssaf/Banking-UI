import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../../core/services/customer.service';
import { SharedModule } from '../../../../app/shared/shared.module';


@Component({
  selector: 'app-transaction-search',
  standalone: true,
  imports: [SharedModule],
  template: `
    <mat-card>
      <form [formGroup]="form" (ngSubmit)="searchCustomer()">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Customer Email</mat-label>
          <input matInput formControlName="email" placeholder="Enter customer email" />
        </mat-form-field>
        <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Search</button>
      </form>
    </mat-card>
  `,
  styles: [`.full-width { width: 100%; margin-bottom: 12px; }`]
})
export class TransactionSearchComponent {
  form: FormGroup;
  @Output() customerSelected = new EventEmitter<string>();

  constructor(private fb: FormBuilder, private customerService: CustomerService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  searchCustomer() {
    const email = this.form.value.email;
    this.customerService.findCustomerByEmail(email).subscribe({
      next: (res: any) => {
        if (res && res.id) {
          this.customerSelected.emit(res.id);
        } else {
          alert('Customer not found');
        }
      },
      error: err => console.error(err)
    });
  }
}
