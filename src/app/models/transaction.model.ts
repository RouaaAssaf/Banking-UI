export interface AddTransactionRequest {
  Amount: number;
  TransactionType: 'Credit' | 'Debit';
  Description: string;
}
export interface Transaction {
  TransactionId: string;
  Amount: number;
  TransactionType: 'Credit' | 'Debit';
  Description: string;
  CreatedAt: string;
  Status?: 'Pending' | 'Completed' | 'Failed';
}

