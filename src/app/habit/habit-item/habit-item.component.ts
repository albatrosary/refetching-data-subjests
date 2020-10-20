import { Component, OnInit, Input } from '@angular/core';

import { Habit } from '../habit';

@Component({
  selector: 'app-habit-item',
  templateUrl: './habit-item.component.html',
  styleUrls: ['./habit-item.component.css']
})
export class HabitItemComponent implements OnInit {

  @Input()
  habit: Habit;
  constructor() { }

  ngOnInit(): void {
  }

}
