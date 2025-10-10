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

  private handleError(msg: string) {
    return (error: any) => {
      const message = error?.error?.Message || error?.message || msg;
      console.error('AccountService Error:', message);
      return throwError(() => new Error(message));
    };
  }

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
            TransactionId: tx.TransactionId,
            transactionType: tx.TransactionType,
            amount: tx.Amount,
            description: tx.Description,
            createdAt: tx.CreatedAt
          }))
        }))
      })),
      catchError(this.handleError('Failed to load customer summary'))
    );}

  addTransaction(accountId: string, request: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${accountId}/transaction`, request)
     .pipe(catchError(this.handleError('Failed to add transaction')));
    
  }

  getAllAccounts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`)
     .pipe(catchError(this.handleError('Failed to load accounts')));
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
       catchError(this.handleError('Failed to load account by ID'))
    );
  }
  deleteAccount(accountId: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${accountId}`) 
    .pipe(catchError(this.handleError('Failed to delete account')));
  }
}


