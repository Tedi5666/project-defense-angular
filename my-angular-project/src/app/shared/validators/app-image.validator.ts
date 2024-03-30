import { ValidatorFn } from '@angular/forms';

export function appImageValidator(domains: string[]): ValidatorFn {
  const domainStrings = domains.join('|');
  const regExp = new RegExp(`http[s]?:\/\/[^\0]+\.(${domainStrings})`);
  return (control) => {
    return control.value == '' || regExp.test(control.value)
      ? null
      : { appImageValidator: true };
  };
}