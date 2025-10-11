// src/app/core/services/account.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CustomerSummary, Account, Transaction } from '../../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = environment.apiUrlAccounts;

  constructor(private http: HttpClient) {}

  private handleError(msg: string) {
    return (error: unknown) => {
      const err = error as { error?: { Message?: string }; message?: string };
      const message = err?.error?.Message || err?.message || msg;
      console.error('AccountService Error:', message);
      return throwError(() => new Error(message));
    };
  }

  // Helper: map backend PascalCase → frontend camelCase
  private mapTransactionBackendToFrontend(tx: any): Transaction {
    return {
      transactionId: tx.TransactionId,
      amount: tx.Amount,
      transactionType: tx.TransactionType,
      description: tx.Description,
      createdAt: tx.CreatedAt
    };
  }

  getCustomerSummary(customerId: string): Observable<CustomerSummary> {
    return this.http.get<any>(`${this.apiUrl}/customers/${customerId}/summary`).pipe(
      map(res => ({
        customerId: res.CustomerId,
        firstName: res.FirstName,
        lastName: res.LastName,
        accounts: (res.Accounts || []).map((acc: any): Account => ({
          accountId: acc.AccountId,
          customerId: acc.CustomerId,
          firstName: acc.FirstName,
          lastName: acc.LastName,
          balance: acc.Balance,
          openedAt: acc.OpenedAt,
          transactions: (acc.Transactions || []).map(this.mapTransactionBackendToFrontend)
        }))
      })),
      catchError(this.handleError('Failed to load customer summary'))
    );
  }

  getAccountById(accountId: string): Observable<Account> {
    return this.http.get<any>(`${this.apiUrl}/${accountId}`).pipe(
      map(acc => ({
        accountId: acc.AccountId,
        customerId: acc.CustomerId,
        firstName: acc.FirstName,
        lastName: acc.LastName,
        balance: acc.Balance,
        openedAt: acc.OpenedAt,
        transactions: (acc.Transactions || []).map(this.mapTransactionBackendToFrontend)
      })),
      catchError(this.handleError('Failed to load account by ID'))
    );
  }

  getAllAccounts(): Observable<Account[]> {
    return this.http.get<any[]>(`${this.apiUrl}`).pipe(
      map(accounts =>
        accounts.map(acc => ({
          accountId: acc.AccountId,
          customerId: acc.CustomerId,
          firstName: acc.FirstName,
          lastName: acc.LastName,
          balance: acc.Balance,
          openedAt: acc.OpenedAt,
          transactions: (acc.Transactions || []).map(this.mapTransactionBackendToFrontend)
        }))
      ),
      catchError(this.handleError('Failed to load accounts'))
    );
  }

  deleteAccount(accountId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${accountId}`)
      .pipe(catchError(this.handleError('Failed to delete account')));
  }
}
