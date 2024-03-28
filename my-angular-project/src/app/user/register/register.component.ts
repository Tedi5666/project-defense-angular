import { Component } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { DEFAULT_EMAIL_DOMAINS } from '../../shared/constant';
import { appEmailValidator } from '../../shared/validators/app-email-validators';
import { matchPassValidator } from '../../shared/validators/match-password-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form = this.fb.group({
    username: ['', Validators.required, Validators.minLength(4)],
    email: ['', [Validators.required, appEmailValidator(DEFAULT_EMAIL_DOMAINS)]],
    image: ['', [Validators.required]],
    passGroup: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(4)]],
      rePass: ['', [Validators.required]],
    },
    {
      validators: [matchPassValidator('password', 'rePass')]
    }),
  });
  constructor(private fb: FormBuilder) {}

  register(): void {
    if (this.form.invalid) {
      console.log('bad form')
      return;
    }
  }
}