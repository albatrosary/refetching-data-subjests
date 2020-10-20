import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Habit } from './habit';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  private refetchSubject = new BehaviorSubject(null);

  constructor(
    private http: HttpClient
  ) { }

  get refetch(): Observable<Habit[]> {
    return this.refetchSubject.asObservable();
  }
  getHabits(): Observable<Habit[]> {
    return this.http.get<Habit[]>('/api/habits');
  }

  addHabit(newHabit: Habit): any {
    return this.http.post<Habit>('/api/habits', newHabit)
      .pipe(
        tap(() => this.refetchSubject.next(null))
      );
  }
}
