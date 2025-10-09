import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = environment.apiUrlAccounts;

  constructor(private http: HttpClient) {}

  getCustomerSummary(customerId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/customers/${customerId}/summary`).pipe(
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
      })),
      catchError(err => {
        const msg = err.error?.message || 'Failed to load customer summary';
        console.error('Error in getCustomerSummary:', msg);
        return throwError(() => new Error(msg));
      })
    );
  }

  addTransaction(accountId: string, request: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${accountId}/transaction`, request).pipe(
      catchError(err => {
        const msg = err.error?.message || 'Failed to add transaction';
        console.error('Error in addTransaction:', msg);
        return throwError(() => new Error(msg));
      })
    );
  }

  getAllAccounts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`).pipe(
      catchError(err => {
        const msg = err.error?.message || 'Failed to load accounts';
        console.error('Error in getAllAccounts:', msg);
        return throwError(() => new Error(msg));
      })
    );
  }

  getAccountById(accountId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${accountId}`).pipe(
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
      })),
      catchError(err => {
        const msg = err.error?.message || 'Failed to load account,please enter valid accountId';
        console.error('Error in getAccountById:', msg);
        return throwError(() => new Error(msg));
      })
    );
  }
  deleteAccount(accountId: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${accountId}`).pipe(
    catchError(err => {
      const msg = err.error?.message || 'Failed to delete account';
      console.error('Error in deleteAccount:', msg);
      return throwError(() => new Error(msg));
    })
  );
}

}
