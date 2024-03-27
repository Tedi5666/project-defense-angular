import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  currentTime: string = '';

  ngOnInit(): void {
    this.updateClock();
  }

  updateClock(): void {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    this.currentTime = `${this.formatTime(hours)}:${this.formatTime(
      minutes
    )}:${this.formatTime(seconds)}`;

    setTimeout(() => this.updateClock(), 1000); // Update every second
  }

  formatTime(time: number): string {
    return time < 10 ? `0${time}` : time.toString();
  }
}