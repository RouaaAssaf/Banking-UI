import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
  standalone: true
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number, currencySign: string = '$'): string {
    return `${currencySign}${value.toFixed(2)}`;
  }
}
