import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { giveAway } from '../../types/GiveAway';
import { UserService } from '../../user/user/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  selectedItem: giveAway | null = null;
  username: string | null = null;
  lastBidder: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userServise: UserService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.apiService.getSpecificItem(id).subscribe({
        next: (res) => {
          this.selectedItem = res;

          this.userServise.getUserProfile(res.author.objectId).subscribe({
            next: (userRef) => {
              this.username = userRef.username;

              if (res.signed.length > 0) {
                this.userServise.getUserProfile(res.signed[res.signed.length]);
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
}