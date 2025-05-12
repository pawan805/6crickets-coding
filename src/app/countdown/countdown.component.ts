import { Component, OnDestroy, OnInit } from '@angular/core';
import { CountdownService } from '../countdown.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-countdown',
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './countdown.component.html',
  providers: [
    CountdownService,
  ],
  styleUrl: './countdown.component.css'
})
export class CountdownComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();
  secondsLeft: number = 0;
  color = 'primary';

  constructor(private countDownService: CountdownService) { }

  ngOnInit(): void {
    this.countDownService.initCountDown();
    this.getSecondsLeft();
  }

  getSecondsLeft() {
    this.countDownService
      .getSecondsLeft()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.secondsLeft = res;
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
