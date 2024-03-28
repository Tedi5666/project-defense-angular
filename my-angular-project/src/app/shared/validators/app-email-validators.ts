import { ValidatorFn } from '@angular/forms';

export function appEmailValidator(domains: string[]): ValidatorFn {
  const domainStrings = domains.join('|');
  const regExp = new RegExp(`[^@]{4,}@(gmail|abv)\.(${domainStrings})$`);
  return (control) => {
    console.log(control.value); 
    console.log(regExp.test(control.value))
    return control.value == '' || regExp.test(control.value)
      ? null
      : { appEmailValidator: true };
  };
}