import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionColor',
  standalone: true
})
export class TransactionColorPipe implements PipeTransform {
  transform(transactionType: string): 'primary' | 'warn' {
    return transactionType === 'Credit' ? 'primary' : 'warn';
  }
}
