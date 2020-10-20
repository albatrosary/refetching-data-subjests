import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HabitListComponent } from './habit/habit-list/habit-list.component';
import { HabitItemComponent } from './habit/habit-item/habit-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HabitListComponent,
    HabitItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
