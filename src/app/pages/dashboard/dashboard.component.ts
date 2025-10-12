import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { SharedModule } from '../../../app/shared/shared.module';
import { DashboardService } from '../../core/services/dashboard.service';

export interface DashboardSummary {
  TotalCustomers: number;
  TotalAccounts: number;
  TransactionsToday: number;
  ActiveCustomers: number;
  PendingTransactions: number;
  AlertAccounts: number;
  DailyTransactionGoal: number;
  VerifiedAccounts: number;
}


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  adminName: string | null = null;

  totalCustomers = 0;
  totalAccounts = 0;
  transactionsToday = 0;

  // NEW middle metrics
  activeCustomers = 0;
  pendingTransactions = 0;
  alertAccounts = 0;
  dailyTransactionGoal = 0;
  verifiedAccounts = 0;

  recentTransactions: any[] = [];
  topAccounts: any[] = [];
  transactionChartLabels: string[] = [];
  transactionChartData: { datasets: { data: number[], label: string }[]; labels: string[] } = { datasets: [], labels: [] };

  loading = true;
  error: string | null = null;

  constructor(private router: Router, private dashboardService: DashboardService) {}

  ngOnInit(): void {

  this.adminName = localStorage.getItem('adminName');
  this.loadDashboard();
}



  private loadDashboard(): void {
    this.loading = true;
    this.error = null;

    this.dashboardService.getDashboardData().subscribe({
      next: (data: DashboardSummary) => {
        // Top cards
        this.totalCustomers = data.TotalCustomers ?? 0;
        this.totalAccounts = data.TotalAccounts ?? 0;
        this.transactionsToday = data.TransactionsToday ?? 0;

        // Middle metrics
        this.activeCustomers = data.ActiveCustomers ?? 0;
        this.pendingTransactions = data.PendingTransactions ?? 0;
        this.alertAccounts = data.AlertAccounts ?? 0;
        this.dailyTransactionGoal = data.DailyTransactionGoal ?? 0;
        this.verifiedAccounts = data.VerifiedAccounts ?? 0;

        this.loading = false;
      },
      error: () => {
       this.error = 'Failed to load dashboard';
       this.loading = false; // stop spinner even on error
     }   
    });
  }

  logout(): void {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('adminName');
    debugger;
    this.router.navigate(['/login']);
  }
}
