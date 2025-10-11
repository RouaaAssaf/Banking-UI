// src/app/core/services/transaction.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Transaction, AddTransactionRequest } from '../../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = environment.apiUrlAccounts;

  constructor(private http: HttpClient) {}

  private handleError(msg: string) {
    return (error: unknown) => {
      const err = error as { error?: { Message?: string }; message?: string };
      const message = err?.error?.Message || err?.message || msg;
      console.error('TransactionService Error:', message);
      return throwError(() => new Error(message));
    };
  }

  
  private mapTransactionBackendToFrontend(tx: any): Transaction {
    return {
      transactionId: tx.TransactionId,
      amount: tx.Amount,
      transactionType: tx.TransactionType,
      description: tx.Description,
      createdAt: tx.CreatedAt
    };
  }

  addTransaction(accountId: string, request: AddTransactionRequest): Observable<Transaction> {
    const payload = {
      Amount: request.amount,
      TransactionType: request.transactionType,
      Description: request.description
    };
    return this.http.post<any>(`${this.apiUrl}/${accountId}/transaction`, payload)
      .pipe(
        map(this.mapTransactionBackendToFrontend),
        catchError(this.handleError('Failed to add transaction'))
      );
  }

  deleteTransaction(transactionId: string): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/delete/${transactionId}`)
    .pipe(catchError(this.handleError('Failed to delete transaction')));
}


  getTransactionsToday(): Observable<Transaction[]> {
    const today = new Date().toISOString().split('T')[0];
    return this.http.get<any[]>(`${this.apiUrl}/transactions?date=${today}`)
      .pipe(
        map(list => list.map(this.mapTransactionBackendToFrontend)),
        catchError(this.handleError("Failed to load today's transactions"))
      );
  }
}
