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
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  return this.http.get<any[]>(`api/transactions?date=${today}`);
}
 deleteTransaction(transactionId: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/delete/${transactionId}`).pipe(
    catchError(err => {
      const msg = err.error?.Message || err.message || 'Failed to delete transaction';
      console.error('Error in deleteTransaction:', msg);
      return throwError(() => msg); // return the message directly
    })
  );
}

}