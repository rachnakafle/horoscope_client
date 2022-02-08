import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UpdateWeeklyComponent } from './update-weekly/update-weekly.component';
import { AuthGuard } from '../auth/auth.guard';
import { EngMonthlyComponent } from './update-monthly/eng.component';
import { EngYearlyComponent } from './update-yearly/eng.component';


const routes: Routes = [
    {
      component: UpdateWeeklyComponent,
      path: 'update-weekly',
      data: {
        breadcrumb: 'Weekly Update Horroscope'
      },
      canActivate: [AuthGuard]
    },
    {
      component: EngMonthlyComponent,
      path: 'update-monthly',
      data: {
        breadcrumb: 'Monthly Update Horroscope '
      },
      canActivate: [AuthGuard],
      
    },
    {
      component: EngYearlyComponent,
      path: 'update-yearly',
      data: {
        breadcrumb: 'Yearly Update Horroscope'
      },
      canActivate: [AuthGuard],
      
    },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HoroscopeRoutingModule { }
