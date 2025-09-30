import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Conge } from 'src/app/Model/Conge.model';
import { Paycode } from 'src/app/Model/Paycode.model';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { CongeService } from 'src/app/Service/conge.service';
import { EmplService } from 'src/app/Service/empl.service';
import { PaycodeService } from 'src/app/Service/paycode.service';

@Component({
  selector: 'app-ajouter-conge',
  templateUrl: './ajouter-conge.component.html',
  styleUrls: ['./ajouter-conge.component.css']
})
export class AjouterCongeComponent {
 conge: Conge = {
  
    empCode : "" ,
       firstname : "" ,
        approver  : "" ,
        start : "" ,
        end : "" ,
       reason : "" ,
        day  : "" ,
        paycode  : "" ,
        source  : "Application" ,
  };

paycode : Paycode[] = [];

  constructor(
    private employeeService: CongeService,
 private paycodeservice : PaycodeService ,
    private authService: AuthServiceService,private router: Router,
  ) {}

  // 🔄 Appelé automatiquement au chargement du composant
  ngOnInit(): void {
     this.loadDepartments();
  }

   loadDepartments(): void {
    this.paycodeservice.getEmployeeList().subscribe({
      next: (data) => {
        this.paycode = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des paycode', err);
      }
    });
  }

  onSubmit() {
    this.employeeService.addEmployee(this.conge).subscribe({
      next: (response) => {
        console.log('Employé ajouté avec succès:', response);
        alert('Employé ajouté avec succès!');
         this.router.navigate(['/liste']); // redirige vers liste
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
