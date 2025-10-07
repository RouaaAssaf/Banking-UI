import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { DashboardService } from '../../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  adminName: string | null = null;

  totalCustomers = 0;
  totalAccounts = 0;
  transactionsToday = 0;

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
      next: data => {
        this.totalCustomers = data.totalCustomers ?? 0;
        this.totalAccounts = data.totalAccounts ?? 0;
        this.transactionsToday = data.transactionsToday ?? 0;
        this.loading = false;
      },
      error: err => {
        console.error('Failed to load dashboard data', err);
        this.error = 'Failed to load dashboard data';
        this.loading = false;
      }
    });
  }

  logout(): void {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('adminName');
    this.router.navigate(['/login']);
  }
}
