export interface AddTransactionRequest {
  Amount: number;
  TransactionType: 'Credit' | 'Debit';
  Description: string;
}
