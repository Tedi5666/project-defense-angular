import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  @ViewChild('createForm') createForm: NgForm | undefined;

  constructor(
    private apiServise: ApiService,
    private router: Router,
    private userService: UserService
  ) {}

  submitHandler(): void {
    if (!this.createForm) {
      return;
    }
    
    const user = this.userService.user;
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
        objectId: user?.objectId,
      },
      signed: [],
    };
    console.log(JSON.stringify(data));

    this.apiServise.createGiveAway(data).subscribe({
      next: (res: any) => {
        user?.posts.push(res.objectId);
        const posts = { posts: user?.posts };
        this.userService
          .createGiveUser(user?.objectId, posts, user?.sessionToken)
          .subscribe(() => this.router.navigate(['/catalog']));
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}