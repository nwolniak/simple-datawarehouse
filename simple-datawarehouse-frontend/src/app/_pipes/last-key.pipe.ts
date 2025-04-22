import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'lastKey',
  standalone: true
})
export class LastKeyPipe implements PipeTransform {

  transform(value: string, separator: string = '->'): string {
    if (!value) {
      return '-';
    }
    return value.split(separator).slice(-1)[0];
  }

}
