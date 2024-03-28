import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DEFAULT_EMAIL_DOMAINS } from '../../shared/constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  appEmailDomains = DEFAULT_EMAIL_DOMAINS;

  login(form: NgForm): void {
    if (form.invalid) {
      console.log('bad form');
      return
    }
  }
}