import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paycode } from 'src/app/Model/Paycode.model';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { CongeService } from 'src/app/Service/conge.service';
import { PaycodeService } from 'src/app/Service/paycode.service';

@Component({
  selector: 'app-modifier-conge',
  templateUrl: './modifier-conge.component.html',
  styleUrls: ['./modifier-conge.component.css']
})
export class ModifierCongeComponent implements OnInit {
    conge: any = {};
  paycode  : Paycode[] = [];
    empCode: string | null = null;
    constructor(
      private congeservice: CongeService,
     private paycodeservice : PaycodeService ,
      private route: ActivatedRoute,
      private router: Router,
      private authService : AuthServiceService
    ) {}
  
  ngOnInit(): void {
      this.loadDepartments();
    const empCode = this.route.snapshot.paramMap.get('empCode');
  
    // Charger la liste des départements AVANT de remplir l'employé

    if (empCode) {
     this.congeservice.getEmployeeByCode(empCode).subscribe(
    (data) => {
      if (Array.isArray(data) && data.length > 0) {
        this.conge = data[0]; // On prend le premier objet
      } else {
        console.error("Aucun conge trouvé");
      }
      console.log('Employé chargé:', this.conge);
    },
    (error) => {
      console.error('Erreur lors du chargement:', error);
    }
  );
    }
  }
  
      loadDepartments(): void {
    this.paycodeservice.getEmployeeList().subscribe({
      next: (data) => {
        this.paycode = data;
      },
      error: (err) => {
        console.error('Erreur chargement départements', err);
      }
    });
  }
  
    loadEmployee(empCode: string): void {
      this.congeservice.getEmployeeByCode(empCode).subscribe({
        next: (data) => {
          this.conge = data;
        },
        error: (err) => {
          console.error('Erreur chargement employé', err);
        }
      });
    }
  
  onUpdate(): void {
    this.congeservice.updateEmployee(this.conge.empCode, this.conge).subscribe({
      next: () => {
        alert('Employé mis à jour avec succès !');
        this.router.navigate(['/liste']); // redirige vers liste
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
  