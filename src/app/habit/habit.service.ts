import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { of } from 'rxjs';

import { Habit } from './habit';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  testData: Habit[] = [
    {value: 'Chack in with parents once a week'},
    {value: 'Record 2 videos per day'},
    {value: 'Work on side project 5 hours/week'},
    {value: 'Write for 20 minutes a day'},
    {value: 'Feed dog twice a day'},
  ];
  constructor(
    private http: HttpClient
  ) { }

  getHabits(): Observable<Habit[]> {
    return this.http.get<Habit[]>('/api/habits');
  }

  addHabit(newHabit: Habit): any {
    return this.http.post<Habit>('/api/habits', newHabit);
  }
}
