import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DashboardSummary } from '../../pages/dashboard/dashboard.component'; 

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = environment.apiUrlDashboard;

  constructor(private http: HttpClient) {}

 getDashboardData(): Observable<DashboardSummary> {
    // Make sure the type matches the backend response exactly
    return this.http.get<DashboardSummary>(`${this.apiUrl}/summary`);
  }
}

