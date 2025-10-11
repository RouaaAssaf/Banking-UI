import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Transaction, AddTransactionRequest } from '../../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = environment.apiUrlAccounts;

  constructor(private http: HttpClient) {}

  addTransaction(accountId: string, tx: AddTransactionRequest): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/${accountId}/transaction`, tx)
      .pipe(catchError(this.handleError('Failed to add transaction')));
  }

  getTransactionsToday(): Observable<Transaction[]> {
    const today = new Date().toISOString().split('T')[0];
    return this.http.get<Transaction[]>(`api/transactions?date=${today}`)
      .pipe(catchError(this.handleError("Failed to load today's transactions")));
  }

  deleteTransaction(transactionId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${transactionId}`)
      .pipe(catchError(this.handleError('Failed to delete transaction')));
  }

  private handleError(msg: string) {
    return (error: unknown) => {
      const err = error as { error?: { Message?: string }; message?: string };
      const message = err?.error?.Message || err?.message || msg;
      console.error('TransactionService Error:', message);
      return throwError(() => new Error(message));
    };
  }
}
