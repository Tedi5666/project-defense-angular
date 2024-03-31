import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailValidatorDirective } from './validators/email-validator.directive';
import { AppImageValidatorDirective } from './validators/app-image-validator.directive';
@NgModule({
  declarations: [
    EmailValidatorDirective,
    AppImageValidatorDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [EmailValidatorDirective, AppImageValidatorDirective]
})
export class SharedModule { }