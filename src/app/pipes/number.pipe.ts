import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'number'
})
export class NumberPipe implements PipeTransform {

  transform(value: string): number | null {
    if (value === null || value === undefined || value === '' || value === '-' || value === '.' || value === '-.') {
      return null;
    }
    return Number(value);
  }

  toString(value: number, focus: boolean = false, decimal: number = 8, decimalDisplay: number = 8): string {
    if (value === null || value === undefined) {
      return '';
    }
    return value.toFixed(focus ? decimal : decimalDisplay).replace(/\.?0*$/, '');
  }
}
