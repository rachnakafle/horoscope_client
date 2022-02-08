import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HoroscopeRoutingModule } from './horoscope-routing.module';

import { UpdateWeeklyComponent } from './update-weekly/update-weekly.component';
import { UpdateDailyComponent } from './update-daily/update-daily.component';
import { TopNavComponent } from './layout/top-nav/top-nav.component';
import { EngMonthlyComponent } from './update-monthly/eng.component';
import { EngYearlyComponent } from './update-yearly/eng.component';


@NgModule({
  declarations: [
    UpdateDailyComponent,
    UpdateWeeklyComponent,
    TopNavComponent,
    EngMonthlyComponent,
    EngYearlyComponent,
    ],
  imports: [
    CommonModule,
    HoroscopeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
  ]
})

export class HoroscopeModule { }
