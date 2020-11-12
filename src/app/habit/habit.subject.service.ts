import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Habit } from './habit';

@Injectable({
  providedIn: 'root'
})
export class HabitSubjectService {
  private refetchSubject = new Subject<Habit[]>();

  constructor(
    private http: HttpClient
  ) { }

  get refetch(): Observable<Habit[]> {
    return this.refetchSubject;
  }

  getHabits(): Observable<Habit[]> {
    return this.http.get<Habit[]>('/api/habits');
  }

  addHabit(newHabit: Habit): Observable<Habit> {
    return this.http.post<Habit>('/api/habits', newHabit)
      .pipe(
        tap(() => this.refetchSubject.next())
      );
  }
}
