import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// 🧩 Import your custom pipes
import { FilterTransactionsPipe } from '../../../shared/pipes/filter-transactions.pipe';
import { TransactionColorPipe } from '../../../shared/pipes/transaction-color.pipe';
import { TransactionIconPipe } from '../../../shared/pipes/transaction-icon.pipe';
import { CurrencyFormatPipe } from '../../../shared/pipes/currency-format.pipe';

@Component({
  selector: 'app-account-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    FilterTransactionsPipe,
    TransactionColorPipe,
    TransactionIconPipe,
    CurrencyFormatPipe
  ],
  templateUrl: './account-card.component.html',

})
export class AccountCardComponent {
  @Input() account: any;
  @Output() addTransaction = new EventEmitter<string>();

  onAddTransaction() {
    this.addTransaction.emit(this.account.accountId);
  }
}
