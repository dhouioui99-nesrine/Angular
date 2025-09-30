import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tache } from 'src/app/Model/Tache.model';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { TacheService } from 'src/app/Service/tache.service';

@Component({
  selector: 'app-ajouter-t',
  templateUrl: './ajouter-t.component.html',
  styleUrls: ['./ajouter-t.component.css']
})
export class AjouterTComponent {
projetId!: number;
  tache: Tache = {
  id : 0,
    tracker: '',
    projet: '',
    subject: '',
    description: '',
    dye_date: '',
    start_date: '',
    statut : '',
    assigned : ''
  };
 
      
  constructor(
    private tacheservice: TacheService,
   private route: ActivatedRoute,
    private authService: AuthServiceService,private router: Router,
  ) {}


ngOnInit(): void {
  this.projetId = Number(this.route.snapshot.paramMap.get('projetId'));
  console.log('Projet ID récupéré : ', this.projetId);
}


 

onSubmit() {
  this.tacheservice.addTache(this.projetId, this.tache).subscribe({
    next: (response) => {
      console.log('Tâche ajoutée avec succès:', response);
      alert('Tâche ajoutée avec succès!');
      this.router.navigate(['/tache']);
    },
    error: (error) => {
      console.error('Erreur lors de l\'ajout de tâche :', error);
      alert('Erreur lors de l\'ajout de tâche.');
    }
  });
}
  logout() {
    this.authService.logout();   // supprime les tokens
    this.router.navigateByUrl('/login');  // redirection
  }


}

