import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { CountDown } from './modals/countdown.interface';
import { of } from 'rxjs';

export const countdownInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.endsWith('/api/deadline')) {
    const mockResponse: CountDown = { secondsLeft: 10 };  // mocked response with 10 seconds
    return of(new HttpResponse({ status: 200, body: mockResponse }));
  }
  return next(req);
};
