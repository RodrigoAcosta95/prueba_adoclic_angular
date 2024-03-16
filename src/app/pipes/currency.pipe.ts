import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyARS'
})
export class CurrencyARSPipe implements PipeTransform {

  transform(value: number | string, symbol: string = 'ARS'): string {
    const formatter = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2
    });
    return formatter.format(Number(value)) + ' ' + symbol;
  }

}
