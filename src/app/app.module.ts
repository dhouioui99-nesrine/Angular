import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { TableComponent } from './Components/table/table.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Components/auth/login/login.component';
import { RegisterComponent } from './Components/auth/register/register.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { DetailsComponent } from './Components/details/details.component';
import { EmployeeAddComponent } from './Components/Employee/employee-add/employee-add.component';
import { EmployeeUpdateComponent } from './Components/Employee/employee-update/employee-update.component';
import { VerifyMFAComponent } from './Components/auth/verify-mfa/verify-mfa.component';
import { AjouterCongeComponent } from './Components/Conges/ajouter-conge/ajouter-conge.component';
import { ListeCongeComponent } from './Components/Conges/liste-conge/liste-conge.component';
import { ModifierCongeComponent } from './Components/Conges/modifier-conge/modifier-conge.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { EmpTimsheetComponent } from './Components/emp-timsheet/emp-timsheet.component';
import { ListePComponent } from './Components/Projet/liste-p/liste-p.component';
import { AjouterPComponent } from './Components/Projet/ajouter-p/ajouter-p.component';
import { ModifierPComponent } from './Components/Projet/modifier-p/modifier-p.component';
import { AjouterTComponent } from './Components/Tache/ajouter-t/ajouter-t.component';
import { ModifierTComponent } from './Components/Tache/modifier-t/modifier-t.component';
import { ListTComponent } from './Components/Tache/list-t/list-t.component';

import { DashboardAdminComponent } from './Components/dashboard-admin/dashboard-admin.component';
import { UnauthorizedComponent } from './Components/auth/unauthorized/unauthorized.component';
import { NgChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TableComponent,
    LoginComponent,
    RegisterComponent,
    SidebarComponent,
    DetailsComponent,
    EmployeeAddComponent,
    EmployeeUpdateComponent,
    VerifyMFAComponent,
    AjouterCongeComponent,
    ListeCongeComponent,
    ModifierCongeComponent,

    EmpTimsheetComponent,
    ListePComponent,
    AjouterPComponent,
    ModifierPComponent,
    AjouterTComponent,
    ModifierTComponent,
    ListTComponent,

    DashboardAdminComponent,
     UnauthorizedComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgChartsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
