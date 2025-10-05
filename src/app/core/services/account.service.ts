// src/app/core/services/account.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = environment.apiUrlAccounts; 

  constructor(private http: HttpClient) {}

  getCustomerSummary(customerId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/customers/${customerId}/summary`)
      .pipe(
        map(res => ({
          customerId: res.CustomerId,
          firstName: res.FirstName,
          lastName: res.LastName,
          accounts: res.Accounts.map((acc: any) => ({
            accountId: acc.AccountId,
            balance: acc.Balance,
            openedAt: acc.OpenedAt,
            transactions: acc.Transactions.map((tx: any) => ({
              transactionType: tx.TransactionType,
              amount: tx.Amount,
              description: tx.Description,
              createdAt: tx.CreatedAt
            }))
          }))
        }))
      );
  }

  addTransaction(accountId: string, request: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${accountId}/transaction`, request);
  }

  getAccountById(accountId: string) {
  return this.http.get<any>(`api/accounts/${accountId}`).pipe(
    map(acc => ({
      accountId: acc.AccountId,
      customerId: acc.CustomerId,
      firstName: acc.FirstName,
      lastName: acc.LastName,
      balance: acc.Balance,
      openedAt: acc.OpenedAt,
      transactions: (acc.Transactions || []).map((tx: any) => ({
        transactionType: tx.TransactionType,
        amount: tx.Amount,
        description: tx.Description,
        createdAt: tx.CreatedAt
      }))
    }))
  );
}




}
