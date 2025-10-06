import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../core/services/customer.service';
import { AccountService } from '../../core/services/account.service';
import { CustomerSummary, Customer } from '../../../app/models/customer.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SummaryComponent implements OnInit {
  customers: Customer[] = [];
  selectedCustomerId: string | null = null;
  summary: CustomerSummary | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private customerService: CustomerService,
    private accountService: AccountService
  ) {}

 ngOnInit(): void {
  this.customerService.getAll().subscribe({
    next: res => {
      console.log('Loaded customers:', res); // <-- ADD THIS
      this.customers = res;
    },
    error: err => console.error(err)
  });
}
  onCustomerChange() {
    if (!this.selectedCustomerId) return;

    this.loading = true;
    this.error = null;
    this.summary = null;

    this.accountService.getCustomerSummary(this.selectedCustomerId).subscribe({
      next: res => {
        this.summary = res;
        this.loading = false;
      },
      error: err => {
        this.error = 'Failed to load summary';
        this.loading = false;
      }
    });
  }
}
