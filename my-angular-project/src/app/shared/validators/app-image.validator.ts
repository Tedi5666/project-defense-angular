import { ValidatorFn } from '@angular/forms';

export function appImageValidator(domains: string[]): ValidatorFn {
  const domainStrings = domains.join('|');
  const regExp = new RegExp(`^https?:\/\/[a-zA-z_./0-9]+\.(${domainStrings})`);
  return (control) => {
    console.log(control.value)
    console.log(domainStrings)
    console.log(regExp)
    return control.value == '' || regExp.test(control.value)
      ? null
      : { appImageValidator: true };
  };
}