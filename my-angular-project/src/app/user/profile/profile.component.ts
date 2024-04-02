import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { ApiService } from '../../api.service';
import { User } from '../../types/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  creations: any = '';
  profile: User | undefined = undefined;
  constructor(private router: Router, private userService: UserService, private apiService: ApiService) {}

  ngOnInit(): void {
    this.profile = this.userService.user;
    this.apiService.getCatalog().subscribe({
      next: (res: any) => {
        this.creations = res.results.filter((item: any) => item.author.objectId === this.profile?.objectId)
      }
    })
  }

}