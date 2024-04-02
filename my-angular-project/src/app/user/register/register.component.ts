import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DEFAULT_EMAIL_DOMAINS, DEFAULT_IMAGE_DOMAINS } from '../../shared/constant';
import { appImageValidator } from '../../shared/validators/app-image.validator';
import { appEmailValidator } from '../../shared/validators/app-email-validators';
import { matchPassValidator } from '../../shared/validators/match-password-validator';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  error: string = ''
  form = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, appEmailValidator(DEFAULT_EMAIL_DOMAINS)]],
    image: ['', [Validators.required, appImageValidator(DEFAULT_IMAGE_DOMAINS)]],
    passGroup: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(4)]],
      rePass: ['', [Validators.required]],
    },
    {
      validators: [matchPassValidator('password', 'rePass')]
    }),
  });
  constructor(private fb: FormBuilder, private userServise: UserService, private router: Router) {}

  register(): void {
    if (this.form.invalid) {
      console.log('bad form')
      return;
    }

    const { username, email, image, passGroup } = this.form.value;

    this.userServise.register(username!, email!, image!, passGroup?.password!).subscribe({
      next: (res) => {
        console.log(res)
        this.router.navigate(['/catalog'])
      },
      error: (err) => {
        console.log(err)
      }
    });
  }
}