import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Departement } from 'src/app/Model/Departement.model';
import { Empl } from 'src/app/Model/Empl.model';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { DepartementService } from 'src/app/Service/departement.service';
import { EmplService } from 'src/app/Service/empl.service';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {
  employee: any = {};
  departments: Departement[] = [];
  empCode: string | null = null;
  constructor(
    private employeeService: EmplService,
    private departmentService: DepartementService,
    private route: ActivatedRoute,
    private router: Router,
    private authService : AuthServiceService
  ) {}

ngOnInit(): void {
  const empCode = this.route.snapshot.paramMap.get('empCode');

  // Charger la liste des départements AVANT de remplir l'employé
  this.loadDepartments();
  if (empCode) {
   this.employeeService.getEmployeeByCode(empCode).subscribe(
  (data) => {
    if (Array.isArray(data) && data.length > 0) {
      this.employee = data[0]; // On prend le premier objet
    } else {
      console.error("Aucun employé trouvé");
    }
    console.log('Employé chargé:', this.employee);
  },
  (error) => {
    console.error('Erreur lors du chargement:', error);
  }
);
  }
}

  loadDepartments(): void {
    this.departmentService.getDepartments().subscribe({
      next: (data) => {
        this.departments = data;
      },
      error: (err) => {
        console.error('Erreur chargement départements', err);
      }
    });
  }

  loadEmployee(empCode: string): void {
    this.employeeService.getEmployeeByCode(empCode).subscribe({
      next: (data) => {
        this.employee = data;
      },
      error: (err) => {
        console.error('Erreur chargement employé', err);
      }
    });
  }

onUpdate(): void {
  this.employeeService.updateEmployee(this.employee.empCode, this.employee).subscribe({
    next: () => {
      alert('Employé mis à jour avec succès !');
      this.router.navigate(['/tab']); // redirige vers liste
    },
    error: (err) => {
      console.error('Erreur mise à jour employé', err);
      alert('Erreur lors de la mise à jour.');
    }
  });
}

   logout() {
    this.authService.logout();   // supprime les tokens
    this.router.navigateByUrl('/login');  // redirection
  }
}
