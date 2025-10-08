import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CustomerService } from '../../../core/services/customer.service';
import { AccountService } from '../../../core/services/account.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-customer-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule
  ],
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss']
})
export class CustomerCreateComponent {
  form: FormGroup;
  loading = false;
  message = '';

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private accountService: AccountService,
    private router: Router
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async submit() {
    // Mark all fields as touched to show validation errors
    this.form.markAllAsTouched();

    // Frontend validation
    if (this.form.invalid) {
      const errors = [];
      if (this.form.get('firstName')?.hasError('required')) errors.push('First Name is required');
      if (this.form.get('lastName')?.hasError('required')) errors.push('Last Name is required');
      if (this.form.get('email')?.hasError('required')) errors.push('Email is required');
      if (this.form.get('email')?.hasError('email')) errors.push('Please enter a valid email');

      this.message = errors.join('. '); // Show all frontend validation errors
      return;
    }

    // Backend request
    this.loading = true;
    this.message = 'Creating customer...';
    const customer = this.form.value;

    try {
      const res: any = await firstValueFrom(this.customerService.createCustomer(customer));
      const customerId = res.id;

      this.message = 'Waiting for account to be ready...';
      const summary = await this.waitForCustomerSummary(customerId);

      if (!summary) {
        this.message = 'Account not ready yet. Please refresh later.';
        this.loading = false;
        return;
      }

      this.loading = false;
      this.message = '';
      this.router.navigate(['/customer-accounts', customerId]);
    } catch (err: any) {
      console.error('Error creating customer', err);
      this.loading = false;
      this.message = err.message || 'Failed to create customer. Please try again.'; // Backend error displayed here
    }
  }

  private async waitForCustomerSummary(
    customerId: string,
    retries = 10,
    intervalMs = 1000
  ): Promise<any | null> {
    for (let i = 0; i < retries; i++) {
      try {
        const summary: any = await firstValueFrom(this.accountService.getCustomerSummary(customerId));
        summary.accounts = summary.accounts || summary.Accounts || [];
        if (summary.accounts.length > 0) return summary;
      } catch (err: any) {
        if (err.status !== 404) console.error(err);
      }
      await new Promise(r => setTimeout(r, intervalMs));
    }
    return null;
  }
}
