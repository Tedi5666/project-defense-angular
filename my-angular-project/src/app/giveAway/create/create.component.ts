import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  defaultType: string = 'Sell';
  @ViewChild('createForm') createForm: NgForm | undefined;

  constructor(private apiServise: ApiService, private router: Router) {}

  submitHandler(): void {
    if (!this.createForm) {
      return;
    }

    const form = this.createForm;
    if (form.invalid) {
      console.log(form.invalid);
      console.log('bad form');
      return;
    }
    const data = {
      ...form.value,
      author: {
        __type: 'Pointer',
        className: '_User',
        objectId: 's4FdcLqMrq',
      },
      signed: [],
    };
    console.log(JSON.stringify(data));

    this.apiServise.createGiveAway(data).subscribe({
      next: (res) => {
        this.router.navigate(['/catalog'])
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}