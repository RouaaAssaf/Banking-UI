import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SharedModule } from '../../../../app/shared/shared.module';
import { AccountService } from '../../../core/services/account.service';
import { TransactionAddComponent } from '../../transactions/transaction-add/transaction-add.component';
import { AccountCardComponent } from '../account-card/account-card.component';





@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [SharedModule, AccountCardComponent],
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  customerId!: string | null;
  accountId!: string | null;
  account: any;
  loading = false;
  errorMessage: string | null = null;

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
        this.errorMessage = 'No customerId or accountId provided in route';
      }
    });
  }

  loadAccountByCustomer() {
    this.loading = true;
    this.errorMessage = null;

    this.accountService.getCustomerSummary(this.customerId!).subscribe({
      next: summary => {
        if (summary?.accounts?.length > 0) {
          this.account = summary.accounts[0];
        } else {
          this.errorMessage = 'No accounts found for this customer';
        }
        this.loading = false;
      },
      error: err => {
        this.errorMessage = err.error?.Message || 'Failed to load account summary';
        this.loading = false;
      }
    });
  }

  loadAccountByAccountId() {
    this.loading = true;
    this.errorMessage = null;

    this.accountService.getAccountById(this.accountId!).subscribe({
      next: acc => {
        this.account = acc;
        this.loading = false;
      },
      error: err => {
        this.errorMessage = err.error?.Message || 'Failed to load account';
        this.loading = false;
      }
    });
  }

  onAddTransaction(accountId: string) {
    const dialogRef = this.dialog.open(TransactionAddComponent, {
      width: '400px',
      data: { accountId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        // Reload account after adding transaction
        if (this.customerId) {
          this.loadAccountByCustomer();
        } else if (this.accountId) {
          this.loadAccountByAccountId();
        }
      }
    });
  }
}
