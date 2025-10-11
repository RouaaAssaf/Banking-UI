// transaction.model.ts
export interface AddTransactionRequest {
  amount: number;
  transactionType: 'Credit' | 'Debit';
  description: string;
}

export interface Transaction {
  transactionId: string;
  amount: number;
  transactionType: 'Credit' | 'Debit';
  description: string;
  createdAt: string;
  status?: 'Pending' | 'Completed' | 'Failed';
}
