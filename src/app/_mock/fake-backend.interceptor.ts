import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { Habit } from '../habit/habit';

const testData = [
  {value: 'Chack in with parents once a week'},
  {value: 'Record 2 videos per day'},
  {value: 'Work on side project 5 hours/week'},
  {value: 'Write for 20 minutes a day'},
  {value: 'Feed dog twice a day'},
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const { url, method, headers, body } = request;

    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(100))
      .pipe(dematerialize<any>());

    function handleRoute(): any {
      switch (true) {
        case url.endsWith('habits') && method === 'GET':
          return getHabits();
        case url.endsWith('habits') && method === 'POST':
          return postHabit(request);
        default:
          return next.handle(request);
      }
    }

    function getHabits(): Observable<HttpResponse<Habit[]>> {
      return ok(JSON.parse(JSON.stringify(testData)));
    }


    function postHabit(request: HttpRequest<Habit>) {
      const habit = request.body;
      testData.push(habit);
      console.log(testData);
      return ok();
    }

    function ok(body?: any): Observable<HttpResponse<any>> {
      return of(new HttpResponse({ status: 200, body }));
    }
  }
}

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
