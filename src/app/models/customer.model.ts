// src/app/core/models/customer.model.ts

export interface Customer {
  customerId: string; // matches backend response
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface CustomerSummary {
  customerId: string;
  firstName: string;
  lastName: string;
  accounts: Account[];
}

export interface Account {
  accountId: string;
  balance: number;
  openedAt: string;
  transactions: Transaction[];
}

export interface Transaction {
  TransactionId: string;
  amount: number;
  transactionType: string;
  description: string;
  createdAt: string;
}
