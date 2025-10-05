import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTransactions',
  standalone: true
})
export class FilterTransactionsPipe implements PipeTransform {
  transform(transactions: any[], limit: number): any[] {
    if (!transactions) return [];
    return transactions.slice(0, limit);
  }
}
