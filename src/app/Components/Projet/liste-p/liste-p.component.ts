import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Projet } from 'src/app/Model/Projet.model';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { ProjetService } from 'src/app/Service/projet.service';

@Component({
  selector: 'app-liste-p',
  templateUrl: './liste-p.component.html',
  styleUrls: ['./liste-p.component.css']
})
export class ListePComponent implements OnInit {

  projet: Projet[] = []; // Liste complète des projets
  filteredEmployee: Projet[] = []; // Liste filtrée

  searchTerm: string = ''; // Terme de recherche
  


  constructor(private authService: AuthServiceService, private projetservice: ProjetService ,private router: Router) {}

  ngOnInit() {
    // Récupérer la liste complète des employés
    this.projetservice.getEmployeeList().subscribe((data: Projet[]) => {
      this.projet = data; 
      this.filteredEmployee = this.projet;  // Initialiser la liste filtrée
    });
  }

  // Fonction de filtrage des projets
  filterEmployees() {
    // Filtrage des employés
    this.filteredEmployee = this.projet.filter(projet => {
      const matchesSearchTerm = projet.name 
        ? projet.name.toLowerCase().includes(this.searchTerm?.toLowerCase() || '') 
        : false;  // Si last_name est undefined, ne pas effectuer la comparaison
  
      
  
      return matchesSearchTerm ;
    });
  }
  
  



  viewEmployeeDetails(emp_code: String) {
    this.router.navigate(['details',emp_code]);
    this.router.navigate(['det',emp_code]);
  }

  logout() {
    this.authService.logout();   // supprime les tokens
    this.router.navigateByUrl('/login');  // redirection
  }


  onDelete(id: any) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet projet ?')) {
      this.projetservice.deleteEmployee(id).subscribe(() => {
        alert('projet supprimé');
         this.router.navigate(['/dash']); // redirige vers liste
        // recharge ou filtre la liste après suppression
      });
    }
  }

  onEdit(id: number) {
    this.router.navigate(['/modp', id]); // suppose une page de modification
  }

//pagination 
paginationConfig = {
  itemsPerPage: 10,
  currentPage: 1
};
onPageChange(page: number) {
  this.paginationConfig.currentPage = page;
}


}


