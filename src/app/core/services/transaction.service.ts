import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';



export interface TransactionRequest {
  amount: number;
  transactionType: number; // 0 = Credit, 1 = Debit
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
 private apiUrl = environment.apiUrlAccounts; 

  constructor(private http: HttpClient) {}

  addTransaction(accountId: string, tx: TransactionRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/${accountId}/transaction`, tx);
  }

  getTransactionsToday() {
  const today = new Date().toISOString().split('T')[0]; 
  return this.http.get<any[]>(`api/transactions?date=${today}`)
   .pipe(catchError(this.handleError('Failed to load today\'s transactions')));
}
 deleteTransaction(transactionId: string) {
    return this.http.delete(`${this.apiUrl}/delete/${transactionId}`)
      .pipe(catchError(this.handleError('Failed to delete transaction')));
  }

 private handleError(msg: string) {
    return (error: any) => {
      const message = error?.error?.Message || error?.message || msg;
      console.error(message, error);
      return throwError(() => new Error(message));
    };
  }

}