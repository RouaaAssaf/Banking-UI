import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = environment.apiUrlDashboard;

  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<{ totalCustomers: number; totalAccounts: number; transactionsToday: number }> {
    return this.http.get<{ totalCustomers: number; totalAccounts: number; transactionsToday: number }>(
      `${this.apiUrl}/summary`
    );
  }
}
