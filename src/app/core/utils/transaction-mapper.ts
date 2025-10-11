// src/app/core/utils/transaction-mapper.ts
import { Transaction } from '../../../app/models/transaction.model';

export function mapTransactionBackendToFrontend(tx: any): Transaction {
  return {
    transactionId: tx.TransactionId,
    amount: tx.Amount,
    transactionType: tx.TransactionType,
    description: tx.Description,
    createdAt: tx.CreatedAt,
    status: tx.Status
  };
}
