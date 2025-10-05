import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TransactionSearchComponent } from '../transaction-search/transaction-search.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, MatCardModule, TransactionSearchComponent],
  template: `
    <app-transaction-search (accountClicked)="onAccountSelected($event)"></app-transaction-search>
  `
})
export class TransactionsComponent {
  constructor(private router: Router) {}

  onAccountSelected(accountId: string) {
    this.router.navigate(['/accounts', accountId]); // navigate to AccountDetailsComponent
  }
}
