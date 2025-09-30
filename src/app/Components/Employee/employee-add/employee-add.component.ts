import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Departement } from 'src/app/Model/Departement.model';
import { Empl } from 'src/app/Model/Empl.model';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { DepartementService } from 'src/app/Service/departement.service';
import { EmplService } from 'src/app/Service/empl.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  employee: Empl = {
    empCode: '',
    firstname: '',
    lastname: '',
    email: '',
    department: ''
  };

  departments: Departement[] = [];

  constructor(
    private employeeService: EmplService,
    private departmentService: DepartementService ,
    private authService: AuthServiceService,private router: Router,
  ) {}

  // 🔄 Appelé automatiquement au chargement du composant
  ngOnInit(): void {
    this.loadDepartments();
  }

  // 🔁 Charge les départements depuis le service
  loadDepartments(): void {
    this.departmentService.getDepartments().subscribe({
      next: (data) => {
        this.departments = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des départements', err);
      }
    });
  }

  onSubmit() {
    this.employeeService.addEmployee(this.employee).subscribe({
      next: (response) => {
        console.log('Employé ajouté avec succès:', response);
        alert('Employé ajouté avec succès!');
         this.router.navigate(['/tab']); // redirige vers liste
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout de l\'employé:', error);
        alert('Erreur lors de l\'ajout de l\'employé.');
      }
    });
  }

  logout() {
    this.authService.logout();   // supprime les tokens
    this.router.navigateByUrl('/login');  // redirection
  }

}