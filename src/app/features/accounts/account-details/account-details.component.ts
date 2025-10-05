import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from '../../../core/services/account.service';
import { TransactionAddComponent } from '../../transactions/transaction-add/transaction-add.component';
import { TransactionIconPipe } from '../../../shared/pipes/transaction-icon.pipe';
import { TransactionColorPipe } from '../../../shared/pipes/transaction-color.pipe';
import { CurrencyFormatPipe } from '../../../shared/pipes/currency-format.pipe';
import { FilterTransactionsPipe } from '../../../shared/pipes/filter-transactions.pipe';
import { AccountCardComponent } from '../account-card/account-card.component';



@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    TransactionIconPipe,  
    TransactionColorPipe , 
    CurrencyFormatPipe
  ],
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  customerId!: string | null;
  accountId!: string | null;
  account: any;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    this.customerId = params.get('customerId');
    this.accountId = params.get('accountId');

    if (this.customerId) {
      this.loadAccountByCustomer();
    } else if (this.accountId) {
      this.loadAccountByAccountId();
    } else {
      console.error('No customerId or accountId provided in route');
    }
  });
}


  loadAccountByCustomer() {
    this.loading = true;
    this.accountService.getCustomerSummary(this.customerId!).subscribe({
      next: (summary: any) => {
        if (summary?.accounts?.length > 0) {
          this.account = summary.accounts[0]; // assuming 1 account per customer
        }
        this.loading = false;
      },
      error: err => {
        console.error('Error loading account summary', err);
        this.loading = false;
      }
    });
  }

  loadAccountByAccountId() {
  this.loading = true;
  this.accountService.getAccountById(this.accountId!).subscribe({
    next: acc => {
      this.account = acc;
      console.log('Loaded account:', acc); // 👀 check if it has firstName, lastName, etc.
      this.loading = false;
    },
    error: err => {
      console.error('Error fetching account', err);
      this.loading = false;
    }
  });
}
  openAddTransactionDialog(accountId: string) {
    const dialogRef = this.dialog.open(TransactionAddComponent, {
      width: '400px',
      data: { accountId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        // Reload account, depending on how it was loaded
        if (this.customerId) {
          this.loadAccountByCustomer();
        } else if (this.accountId) {
          this.loadAccountByAccountId();
        }
      }
    });
  }
}
