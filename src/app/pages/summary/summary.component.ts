import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../core/services/customer.service';
import { AccountService } from '../../core/services/account.service';
import { TransactionService } from '../../core/services/transaction.service';
import { CustomerSummary, Customer } from '../../../app/models/customer.model';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class SummaryComponent implements OnInit {
  customers: Customer[] = [];
  selectedCustomerId: string | null = null;
  summary: CustomerSummary | null = null;
  accounts: any[] = [];
  errorMessage: string | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private customerService: CustomerService,
    private accountService: AccountService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.customerService.getAll().subscribe({
      next: res => {
        console.log('Loaded customers:', res);
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


  deleteCustomer(customerId: string): void {
    if (confirm('Are you sure you want to delete this customer and all related accounts and transactions?')) {
      this.loading = true;
      this.customerService.deleteCustomer(customerId).subscribe({
        next: () => {
          this.customers = this.customers.filter(c => c.customerId !== customerId);
          alert('Customer and related data deleted successfully!');
          this.loading = false;
        },
        error: (err) => {
          alert(err.message || 'Failed to delete customer.');
          this.loading = false;
        }
      });
    }
  }

  loadAccounts(): void {
    this.loading = true;
    this.accountService.getAllAccounts().subscribe({
      next: (data) => {
        this.accounts = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.message || 'Failed to load accounts';
        this.loading = false;
      }
    });
  }


  // ✅ DELETE ACCOUNT
  deleteAccount(accountId: string) {
    if (confirm('Are you sure you want to delete this account?')) {
      this.accountService.deleteAccount(accountId).subscribe({
        next: () => {
          if (this.summary) {
            this.summary.accounts = this.summary.accounts.filter(a => a.accountId !== accountId);
          }
          alert('Account deleted successfully.');
          this.loadAccounts(); 
        },
        error: err => {
          console.error(err);
          alert('Failed to delete account.');
        }
      });
    }
  }

  
  deleteTransaction(accountId: string, transactionId: string) {
  if (!confirm('Are you sure you want to delete this transaction?')) return;

  this.transactionService.deleteTransaction(transactionId).subscribe({
    next: () => {
      const account = this.summary?.accounts.find(a => a.accountId === accountId);
      if (account) {
        const deletedTx = account.transactions.find(t => t.TransactionId === transactionId);
        if (deletedTx) {
          // Adjust balance locally for instant feedback
          if (deletedTx.transactionType === 'Credit') {
            account.balance -= deletedTx.amount;
          } else if (deletedTx.transactionType === 'Debit') {
            account.balance += deletedTx.amount;
          }
        }
        account.transactions = account.transactions.filter(t => t.TransactionId !== transactionId);
      }
      alert('Transaction deleted successfully.');
    },
    error: (err) => {
      console.error('Delete transaction error:', err);
      alert(`Failed to delete transaction: ${err}`);
    }
  });
}


}
