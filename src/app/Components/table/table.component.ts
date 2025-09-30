import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empl } from 'src/app/Model/Empl.model';
import { Employee } from 'src/app/Model/Employee.model';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { DepartementService } from 'src/app/Service/departement.service';
import { EmplService } from 'src/app/Service/empl.service';
import { EmployeeService } from 'src/app/Service/employee.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  employees: Empl[] = []; // Liste complète des employés
  filteredEmployee: Empl[] = []; // Liste filtrée
  departments: any[] = [];  // Liste des départements
  searchTerm: string = ''; // Terme de recherche
  dep:string[]=['OTH','Appli_Groupe','Infra_Groupe','Innov_Groupe','stagiaire'];
  departmentSearchTerm: string = ''; // Terme de recherche pour le département
 
  selectedDepartment: string = ''; // Département sélectionné dans la liste déroulante



  constructor(private authService: AuthServiceService, private employeeService: EmplService ,private router: Router, private departmentService: DepartementService) {}

  ngOnInit() {
    // Récupérer la liste complète des employés
    this.employeeService.getEmployeeList().subscribe((data: Empl[]) => {
      this.employees = data; 
      this.filteredEmployee = this.employees;  // Initialiser la liste filtrée
    });
//departement
this.departmentService.getDepartments().subscribe(
  (data: any[]) => {
    this.departments = data;
    console.log('Departments:', this.departments);  // Vérifie que les départements sont bien récupérés
  },
  (error) => {
    console.error('Error loading departments:', error);  // Gère les erreurs
  }
);
  }

  // Fonction de filtrage des employés
  filterEmployees() {
    // Filtrage des employés
    this.filteredEmployee = this.employees.filter(employee => {
      const matchesSearchTerm = employee.lastname 
        ? employee.lastname.toLowerCase().includes(this.searchTerm?.toLowerCase() || '') 
        : false;  // Si last_name est undefined, ne pas effectuer la comparaison
  
        const matchesSelectedDepartment = this.selectedDepartment
        ? employee.department=== this.selectedDepartment
        : true; // Si un département est sélectionné, filtrer par celui-ci
  
      return matchesSearchTerm && matchesSelectedDepartment;
    });
  }
  
  


  /*
  // Fonction de filtrage des employés par employee
  filterdep() {
    if (!this.searchTerm) {
      // Si aucun terme de recherche, afficher les 10 premiers employés
      this.filteredEmployee = this.employees.slice(0, 10);
    } else {
      // Filtrage selon les critères
      this.filteredEmployee = this.employees.filter(employee =>
        
        (employee.empCode && employee.empCode.toString().includes(this.searchTerm)) || 
        (employee.first_name && employee.first_name.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
    
        (employee.email && employee.email.toLowerCase().includes(this.searchTerm.toLowerCase())) 
       
      ); 
    }
  }
*/
  viewEmployeeDetails(emp_code: String) {
    this.router.navigate(['details',emp_code]);
    this.router.navigate(['det',emp_code]);
  }

logout() {
    this.authService.logout();   // supprime les tokens
    this.router.navigateByUrl('/login');  // redirection
  }


  onDelete(empCode: any) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
      this.employeeService.deleteEmployee(empCode).subscribe(() => {
        alert('Employé supprimé');
         this.router.navigate(['/dash']); // redirige vers liste
        // recharge ou filtre la liste après suppression
      });
    }
  }

  onEdit(empCode: any) {
    this.router.navigate(['/update', empCode]); // suppose une page de modification
  }


}


