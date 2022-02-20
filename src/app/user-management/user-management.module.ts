import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSnackBarModule } from '@angular/material/snack-bar';

//Page components
import { AllUsersComponent } from './all-users/all-users.component';
import { UserRolesComponent } from './user-roles/user-roles.component';

//layout components
import { UmNavComponent } from './layout/um-nav/um-nav.component';

//Dialogs components
import { CreateUserComponent } from './dialogs/create-user/create-user.component';
import { EditUserComponent } from './dialogs/edit-user/edit-user.component';
import { DeleteUserComponent } from './dialogs/delete-user/delete-user.component';
import { CreateRoleComponent } from './dialogs/create-role/create-role.component';
import { EditRoleComponent } from './dialogs/edit-role/edit-role.component';
import { ChangePasswordComponent } from './dialogs/change-password/change-password.component';
import { ViewUserComponent } from './dialogs/view-user/view-user.component';
import { DeleteRoleComponent } from './dialogs/delete-role/delete-role.component';


@NgModule({
  declarations: [
    AllUsersComponent,
    UserRolesComponent,
    UmNavComponent,
    CreateUserComponent,
    EditUserComponent,
    DeleteUserComponent,
    CreateRoleComponent,
    EditRoleComponent,
    ChangePasswordComponent,
    ViewUserComponent,
    DeleteRoleComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    MatSnackBarModule
  ]
})
export class UserManagementModule { }
