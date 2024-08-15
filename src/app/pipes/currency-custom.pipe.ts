import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyCustom',
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number, currency: string = 'Rs'): string | null {
    if (value == null) return null;

    let formattedPrice = value.toFixed(2);

    switch (currency) {
      case 'USD':
        formattedPrice = '$' + formattedPrice;
        break;
      case 'EUR':
        formattedPrice = '€' + formattedPrice;
        break;
      case 'GBP':
        formattedPrice = '£' + formattedPrice;
        break;
      default:
        formattedPrice = currency + ' ' + formattedPrice;
    }

    return formattedPrice;
  }
}
