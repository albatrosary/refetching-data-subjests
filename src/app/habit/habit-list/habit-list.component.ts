import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Habit } from '../habit';
import { HabitService } from '../habit.service';
import { HabitObservableService } from '../habit.observable.service';
import { HabitSubjectService } from '../habit.subject.service';
@Component({
  selector: 'app-habit-list',
  templateUrl: './habit-list.component.html',
  styleUrls: ['./habit-list.component.css'],
  providers: [
    // { provide: HabitService,   useClass:   HabitObservableService },
    // { provide: HabitService,   useClass:   HabitSubjectService },
  ]
})
export class HabitListComponent implements OnInit {
  habits: Observable<Habit[]>;
  habit: string;
  constructor(
    private habitService: HabitService
  ) { }

  ngOnInit(): void {
    // Subject or BehaviorSubject
    this.habits = this.habitService.refetch.pipe(
      switchMap(() => this.habitService.getHabits())
    );

    // Observable
    // this.habits = this.habitService.getHabits();
  }

  onAddHabit(newHabit: Habit): void {
    this.habitService.addHabit(newHabit).subscribe();
  }
}
