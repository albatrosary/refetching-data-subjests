import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Habit } from '../habit';
import { HabitService } from '../habit.service';
@Component({
  selector: 'app-habit-list',
  templateUrl: './habit-list.component.html',
  styleUrls: ['./habit-list.component.css']
})
export class HabitListComponent implements OnInit {
  habits: Observable<Habit[]>;
  habit: string;
  constructor(private habitService: HabitService) { }

  ngOnInit(): void {
    this.habits = this.habitService.refetch.pipe(
      switchMap(() => this.habitService.getHabits())
    );
  }

  onAddHabit(newHabit: Habit): void {
    this.habitService.addHabit(newHabit).subscribe();
  }
}
