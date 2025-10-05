import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TransactionRequest {
  amount: number;
  transactionType: number; // 0 = Credit, 1 = Debit
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'api/accounts';

  constructor(private http: HttpClient) {}

  addTransaction(accountId: string, tx: TransactionRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/${accountId}/transaction`, tx);
  }
}
