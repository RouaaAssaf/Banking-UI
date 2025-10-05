import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionType',
  standalone: true
})
export class TransactionTypePipe implements PipeTransform {
  transform(value: string | number, format: 'text' | 'icon' = 'text'): string {
    let typeText = '';
    if (value === 0 || value === 'Debit') typeText = 'Debit';
    if (value === 1 || value === 'Credit') typeText = 'Credit';

    if (format === 'text') return typeText;
    if (format === 'icon') return typeText === 'Credit' ? 'arrow_downward' : 'arrow_upward';

    return typeText;
  }
}
