import { Directive, Input, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn } from '@angular/forms';
import { appImageValidator } from './app-image.validator';

@Directive({
  selector: '[appImageValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: AppImageValidatorDirective,
      multi: true,
    },
  ],
})
export class AppImageValidatorDirective {

  @Input() appImageValidator: string[] = [];
  validator: ValidatorFn = () => null;

  constructor() { }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.validator(control);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const currentChanges = changes['appImageValidator'];
    console.log(changes)

    if (currentChanges) {
      this.validator = appImageValidator(currentChanges.currentValue);
    }
  }

}