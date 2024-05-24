import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber',
  standalone: true,
})
export class PhoneNumberPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    if (!value) return 'Vide';

    let phone = value.split('-');
    phone = phone.join(' ').split('.');
    return phone.join(' ');
  }
}
