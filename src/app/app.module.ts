import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbActiveModal, NgbDatepickerModule, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgChartsModule } from 'ng2-charts';
import { HoroscopeModule } from './horoscope/horoscope.module';
import { AccountModule } from './account/account.module';
import { UserManagementModule } from './user-management/user-management.module';
import { DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';



import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';

import { NavMenuComponent } from './layout/nav-menu/nav-menu.component';
import { SidemenuComponent } from './layout/sidemenu/sidemenu.component';
import { BreadcrumbsComponent } from './layout/breadcrumbs/breadcrumbs.component';
import { CpanelComponent } from './cpanel/cpanel.component';
import { DashItemComponent } from './cpanel/dash-item/dash-item.component';
import { StatItemComponent } from './cpanel/stat-item/stat-item.component';
import { ChartComponent } from './cpanel/chart/chart.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    SidemenuComponent,
    LoginComponent,
    CpanelComponent,
    BreadcrumbsComponent,
    DashItemComponent,
    StatItemComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule,
    HoroscopeModule,
    AccountModule,
    UserManagementModule,
    NgbDatepickerModule,
    NgxPaginationModule
  ],
  providers: [DatePipe,NgbModal, NgbActiveModal],
  bootstrap: [AppComponent]
})

export class AppModule { }
