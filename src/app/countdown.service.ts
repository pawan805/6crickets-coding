import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, scan, Subject, takeUntil, takeWhile, tap, timer } from 'rxjs';
import { CountDown } from './modals/countdown.interface';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  apiEndPoint: string = '/api/deadline';
  private readonly secondsLeft$ = new BehaviorSubject<number>(0);
  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  initCountDown(): void {
    // Clear any existing timers
    this.destroy$.next();

    this.http.get<CountDown>(this.apiEndPoint).pipe(
      tap(({ secondsLeft }) => {
        this.secondsLeft$.next(secondsLeft);
        this.startCountdown(secondsLeft);
      }),
      catchError(error => {
        console.error('Failed to load deadline', error);
        return [];
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  /**
   * Starts a countdown timer that emits the remaining seconds every second.
   * The countdown begins from the given initial number of seconds and stops at zero.
   * It also ensures the timer is cleaned up when the component is destroyed.
   */
  private startCountdown(initialSeconds: number): void {
    timer(0, 1000).pipe(
      takeUntil(this.destroy$),
      takeWhile(count => initialSeconds - count > 0, true),
      tap(count => {
        this.secondsLeft$.next(initialSeconds - count);
      })
    ).subscribe();
  }

  getSecondsLeft(): Observable<number> {
    return this.secondsLeft$.asObservable();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
