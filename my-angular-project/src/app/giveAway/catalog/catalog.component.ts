import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { giveAway } from '../../types/GiveAway';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  posts: giveAway[] = [];
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getCatalog().subscribe((data: any) => {
      this.posts = data.results;
    });
  }
}