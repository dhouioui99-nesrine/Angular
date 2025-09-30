import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tache } from 'src/app/Model/Tache.model';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { TacheService } from 'src/app/Service/tache.service';

@Component({
  selector: 'app-list-t',
  templateUrl: './list-t.component.html',
  styleUrls: ['./list-t.component.css']
})
export class ListTComponent implements OnInit {
  projectId!: number;
  tache: Tache[] = []; // Liste complète des taches
  filteredEmployee: Tache[] = []; // Liste filtrée

  searchTerm: string = ''; // Terme de recherche
  


  constructor(private authService: AuthServiceService, private tacheservice: TacheService ,private router: Router, private route: ActivatedRoute,) {}

  ngOnInit(): void {
  this.projectId = Number(this.route.snapshot.paramMap.get('id'));
  console.log("Projet sélectionné :", this.projectId);

  this.tacheservice.getTachesByProjet(this.projectId).subscribe(
    (res) => {
      this.tache = res; // on utilise directement tache
      console.log("Tâches récupérées :", this.tache);
      this.filteredEmployee=this.tache ;
       this.availableSources = Array.from(new Set(this.tache.map(leave => leave.tracker)));
  
  // Ajouter une option "Tous" pour afficher tout
  this.availableSources.unshift('all');
   this.tache = res || []; // ← assure liste vide si res est null
      if (this.tache.length === 0) {
        console.log("Ce projet n'a pas encore de tâches.");
      }
    },
    (err) => {
      console.error("Erreur lors du chargement des tâches", err);
    }
  );
}
  
  
selectedSource: string = 'all';
availableSources: string[] = [];
filterBySource() {
  if (this.selectedSource === 'all') {
    this.filteredEmployee = this.tache;
  } else {
    this.filteredEmployee = this.tache.filter(leave => leave.tracker === this.selectedSource);
  }
}



 logout() {
    this.authService.logout();   // supprime les tokens
    this.router.navigateByUrl('/');  // redirection
  }

  onDelete(id: any) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet tache ?')) {
      this.tacheservice.deleteEmployee(id).subscribe(() => {
        alert('tache supprimé');
         this.router.navigate(['/tache']); // redirige vers liste
        // recharge ou filtre la liste après suppression
      });
    }
  }

  onEdit(id: number) {
    this.router.navigate(['/modT', id]); // suppose une page de modification
  }

//pagination 
paginationConfig = {
  itemsPerPage: 5,
  currentPage: 1
};
onPageChange(page: number) {
  this.paginationConfig.currentPage = page;
}


}


