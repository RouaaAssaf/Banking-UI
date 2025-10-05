import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionIcon',
  standalone: true 
})
export class TransactionIconPipe implements PipeTransform {
  transform(transactionType: string): string {
    return transactionType === 'Credit' ? 'arrow_downward' : 'arrow_upward';
  }
}
