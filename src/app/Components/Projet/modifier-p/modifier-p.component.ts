import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { ProjetService } from 'src/app/Service/projet.service';

@Component({
  selector: 'app-modifier-p',
  templateUrl: './modifier-p.component.html',
  styleUrls: ['./modifier-p.component.css']
})
export class ModifierPComponent implements OnInit {
  projet: any = {};

  id?: number ;
  constructor(
    private projetservice: ProjetService,

    private route: ActivatedRoute,
    private router: Router,
    private authService : AuthServiceService
  ) {}

ngOnInit(): void {
let id = Number(this.route.snapshot.paramMap.get('id'));


  // Charger la liste des départements AVANT de remplir l'employé
 
  if (id) {
this.projetservice.getEmployeeById(id).subscribe(
  (res) => {
    if (!res || res.length === 0) {
      console.log("Aucun projet trouvé");
    } else {
      this.projet = res;  // ou res[0] selon ton retour
    }
  },
  (err) => {
    console.error("Erreur lors de la récupération :", err);
  }
);}
}



  loadEmployee(id: number): void {
    this.projetservice.getEmployeeById(id).subscribe({
      next: (data) => {
        this.projet = data;
      },
      error: (err) => {
        console.error('Erreur chargement employé', err);
      }
    });
  }

onUpdate(): void {
  this.projetservice.updateEmployee(this.projet.id, this.projet).subscribe({
    next: () => {
      alert('projet mis à jour avec succès !');
      this.router.navigate(['/listP']); // redirige vers liste
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
