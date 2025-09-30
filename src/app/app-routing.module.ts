import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './Components/table/table.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LoginComponent } from './Components/auth/login/login.component';
import { RegisterComponent } from './Components/auth/register/register.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { EmployeeAddComponent } from './Components/Employee/employee-add/employee-add.component';
import { EmployeeUpdateComponent } from './Components/Employee/employee-update/employee-update.component';
import { DetailsComponent } from './Components/details/details.component';
import { VerifyMFAComponent } from './Components/auth/verify-mfa/verify-mfa.component';
import { AjouterCongeComponent } from './Components/Conges/ajouter-conge/ajouter-conge.component';
import { ModifierCongeComponent } from './Components/Conges/modifier-conge/modifier-conge.component';
import { ListeCongeComponent } from './Components/Conges/liste-conge/liste-conge.component';

import { EmpTimsheetComponent } from './Components/emp-timsheet/emp-timsheet.component';
import { AjouterPComponent } from './Components/Projet/ajouter-p/ajouter-p.component';
import { ModifierPComponent } from './Components/Projet/modifier-p/modifier-p.component';
import { ListePComponent } from './Components/Projet/liste-p/liste-p.component';
import { AjouterTComponent } from './Components/Tache/ajouter-t/ajouter-t.component';
import { ModifierTComponent } from './Components/Tache/modifier-t/modifier-t.component';
import { ListTComponent } from './Components/Tache/list-t/list-t.component';
import { DashboardAdminComponent } from './Components/dashboard-admin/dashboard-admin.component';
import { RoleGuard } from './Service/RoleGuard';
import { UnauthorizedComponent } from './Components/auth/unauthorized/unauthorized.component';

const routes: Routes = [
    { path: '', component: LoginComponent }, // page de login

    { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'dash', component: DashboardComponent },
  { path: 'dashA', component: DashboardAdminComponent },
  { path: 'tab', component: TableComponent },
  { path: 'sid', component: SidebarComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  

  {path:'sid', component:SidebarComponent},
  {path:'add', component:EmployeeAddComponent},
  {path: 'update/:empCode' , component:EmployeeUpdateComponent},
  {path : "det/:empCode" , component:DetailsComponent},
 {path : "verify" , component: VerifyMFAComponent} ,
 //Conges
 {path : "ajouter" , component: AjouterCongeComponent} ,
 {path : "mod/:empCode" , component:ModifierCongeComponent} ,
 {path : "liste" , component: ListeCongeComponent},
  {path : "delete/:empCode" , component: ListeCongeComponent},

   {path : 'time/:empCode' , component:EmpTimsheetComponent},

   //projets
   {path :"nouv" , component:AjouterPComponent},
   {path : "modp/:id" , component:ModifierPComponent},
   {path : "listP" , component:ListePComponent},
    {path : "delet/:id" , component:ListePComponent},
    //Tache
 

   {path :"addT/:projetId" , component:AjouterTComponent},
   {path : "modT/:id" , component:ModifierTComponent},
   {path : "tache/:id" , component:ListTComponent},
    {path : "del/:id" , component:ListTComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
