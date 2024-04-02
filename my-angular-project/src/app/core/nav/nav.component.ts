import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  constructor(private router: Router , private userService: UserService){}

  get isLoggedIn():boolean {
    return this.userService.isLogged
  }

  logout(){
    this.userService.logout().subscribe(() => {
      this.router.navigate(['/catalog'])
    })
  }
}