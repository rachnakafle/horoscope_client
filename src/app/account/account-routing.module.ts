import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {
    component: ChangePasswordComponent,
    path: 'change-password',
    data: {
      breadcrumb: 'Change Password',
    },
    canActivate: [AuthGuard],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
