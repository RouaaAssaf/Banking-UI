import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

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

}
