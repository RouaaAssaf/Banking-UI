import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../../core/services/account.service';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-customer-summary',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule, MatListModule, MatIconModule],
  template: `
    <div *ngIf="loading">
      <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
      <p>Loading customer summary...</p>
    </div>

    <mat-card *ngFor="let account of filteredAccounts">
      <mat-card-title>Account: {{ account.accountId }}</mat-card-title>
      <mat-card-subtitle>Balance: {{ account.balance | currency }}</mat-card-subtitle>

      <h4>Transactions</h4>
      <mat-list *ngIf="account.transactions?.length">
        <mat-list-item *ngFor="let tx of account.transactions">
          <mat-icon [color]="tx.transactionType === 'Credit' ? 'primary' : 'warn'">
            {{ tx.transactionType === 'Credit' ? 'arrow_downward' : 'arrow_upward' }}
          </mat-icon>
          {{ tx.description }} - {{ tx.amount | currency }} - {{ tx.createdAt | date:'short' }}
        </mat-list-item>
      </mat-list>
      <p *ngIf="!account.transactions?.length">No transactions yet.</p>
    </mat-card>
  `
})
export class CustomerSummaryComponent implements OnInit, OnChanges {
  @Input() customerId!: string;
  @Input() accountId?: string;  // optional input to fix the error
  summary: any;
  filteredAccounts: any[] = [];
  loading = true;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    if (this.customerId) {
      this.loadSummary();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['accountId'] && this.summary) {
      this.filterAccounts();
    }
  }

  loadSummary() {
    this.loading = true;
    this.accountService.getCustomerSummary(this.customerId).subscribe({
      next: res => {
        this.summary = res;
        this.filterAccounts();
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  private filterAccounts() {
    if (this.accountId) {
      this.filteredAccounts = this.summary.accounts.filter((a: any) => a.accountId === this.accountId);
    } else {
      this.filteredAccounts = this.summary.accounts;
    }
  }
}
