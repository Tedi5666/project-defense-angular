import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { giveAway } from '../../types/GiveAway';
import { User } from '../../types/User';
import { UserService } from '../../user/user/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  owner: boolean = false;
  try: boolean = false
  selectedItem: giveAway | null = null;
  username: string | null = null;
  currentUser: User | null = null;
  hasSigned: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.apiService.getSpecificItem(id).subscribe({
        next: (res) => {
          this.selectedItem = res;
          
          this.userService.getUserProfile(res.author['objectId']).subscribe({
            next: (userRef) => {
              this.username = userRef.username;
              this.try = userRef.objectId == this.userService.user?.objectId;

              if (this.userService.user) {
                this.owner = res.author.objectId === userRef.objectId ? true : false;
                this.hasSigned = this.selectedItem?.signed.find(id => id === this.currentUser?.objectId) ? true : false;
              }

            },
            error: (err) => {
              console.log(err);
            },
          });
        },
        error: (err) => {
          console.log('Error res ' + err);
        },
      });
    }
  }
  deleteGiveaway(id: string | undefined): void {
    this.apiService.deleteGiveaway(id).subscribe(() => this.router.navigate(['/catalog']));
  } 
}
