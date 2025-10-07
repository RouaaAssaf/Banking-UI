import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CustomerCreateComponent } from './features/customers/customer-create/customer-create.component';
import { AccountDetailsComponent } from './features/accounts/account-details/account-details.component';
import { TransactionAddComponent } from './features/transactions/transaction-add/transaction-add.component';
import { CustomerSummaryComponent } from './features/customers/customer-summary/customer-summary.component';
import { TransactionsComponent } from './features/transactions/transaction/transaction.component';
import { AuthGuard } from './core/guards/auth.guard';
import { SummaryComponent } from './pages/summary/summary.component'; 

export const routes: Routes = [
 
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard-home', component: DashboardComponent },
      { path: 'customers/create', component: CustomerCreateComponent },
      { path: 'customer-accounts/:customerId', component: AccountDetailsComponent },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'transactions/add/:customerId', component: TransactionAddComponent },
      { path: 'summary', component: SummaryComponent }, 
      { path: 'summary/:customerId', component: CustomerSummaryComponent },
      { path: 'accounts/:accountId', component: AccountDetailsComponent },
      
    ]
  },

  
  { path: '**', redirectTo: '' }
];
