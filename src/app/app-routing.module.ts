import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthGuard } from './auth/auth.guard';

import { HoroscopeRoutingModule } from './horoscope/horoscope-routing.module';
import { AccountRoutingModule } from './account/account-routing.module';
import { UserManagementRoutingModule } from './user-management/user-management-routing.module';

import { LoginComponent } from './login/login.component';
import { CpanelComponent } from './cpanel/cpanel.component';
import { ProfileComponent } from './account/profile.component';
import { AllUsersComponent } from './user-management/all-users/all-users.component';
import { UpdateDailyComponent } from './horoscope/update-daily/update-daily.component';


const routes: Routes = [
  {
    component: LoginComponent,
    path: 'login',
  },
  {
    component: CpanelComponent,
    path: '',
    data: {
      breadcrumb: 'Home'
    },
    canActivate: [AuthGuard],
    children: [
      {
      path: 'horoscope',
      data: {
        breadcrumb: 'Horoscope'
      },
      component: UpdateDailyComponent,
      loadChildren: () => HoroscopeRoutingModule
      },
      {
        path: 'account',
        data: {
          breadcrumb: 'Account'
        },
        component: ProfileComponent,
        loadChildren: () => AccountRoutingModule
      },
      {
        path: 'user-management',
        data: {
          breadcrumb: 'User Management'
        },
        component: AllUsersComponent,
        loadChildren: () => UserManagementRoutingModule
      }
    ],
    
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
