import { Component, OnInit } from '@angular/core';
import { ErrorService } from './error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  apiError$ = this.errorService.apiError$$.asObservable();
  errorMsg = '';

  constructor(private errorService: ErrorService) {}

  ngOnInit(): void {
    this.apiError$.subscribe((err: any) => {
      if (err) {
        this.errorMsg = err;

        setTimeout(() => {
          this.errorMsg = '';
          this.errorService.apiError$$.next(null);
        }, 3000);
      }
    });
  }
}