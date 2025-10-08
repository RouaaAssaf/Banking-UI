import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../../../app/shared/shared.module';
import { TransactionSearchComponent } from '../transaction-search/transaction-search.component';


@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [SharedModule,TransactionSearchComponent],
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
