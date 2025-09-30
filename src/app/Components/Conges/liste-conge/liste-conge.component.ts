import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Conge } from 'src/app/Model/Conge.model';
import { Empl } from 'src/app/Model/Empl.model';

import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { CongeService } from 'src/app/Service/conge.service';
import { DepartementService } from 'src/app/Service/departement.service';

@Component({
  selector: 'app-liste-conge',
  templateUrl: './liste-conge.component.html',
  styleUrls: ['./liste-conge.component.css']
})
export class ListeCongeComponent implements OnInit {

  conge: Conge[] = []; // Liste complète des projets
  filteredEmployee: Conge[] = []; // Liste filtrée
  searchTerm: string = ''; // Terme de recherche

  // filtré date
    selectedDate: string = '';  // Valeur par défaut vide, tu pourras la changer via l'input

    startDate: string = '2024-01-01';  // La date de début est définie sur le 20 OCTOBRE 2024
    Day: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
    months: string[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    selectedMonth: string = this.months[new Date().getMonth()];
    years: string[] = [  '2025','2024', '2023' , '2022'];
    selectedYear: string = new Date().getFullYear().toString();
    selectedDay: string = new Date().getDay().toString();
    @Output() monthYearChanged: EventEmitter<{ month: string, year: string }> = new EventEmitter();


  constructor(private authService: AuthServiceService, private congeservice: CongeService ,private router: Router) {}

  ngOnInit() {
    // Récupérer la liste complète des employés
    this.congeservice.getEmployeeList().subscribe((data: Conge[]) => {
      this.conge = data; 
     this.filteredEmployee = this.conge; 
  this.availableSources = Array.from(new Set(this.conge.map(leave => leave.source)));
  
  // Ajouter une option "Tous" pour afficher tout
  this.availableSources.unshift('all');    });
    
  }
onDateFilterChange() {

  this.monthYearChanged.emit({ month: this.selectedMonth, year: this.selectedDay });
}
  
    filtreConge() {
    // Filtrage des employés
    this.filteredEmployee = this.conge.filter(conge => {
      const matchesSearchTerm = conge.firstname 
        ? conge.firstname.toLowerCase().includes(this.searchTerm?.toLowerCase() || '') 
        : false;  // Si last_name est undefined, ne pas effectuer la comparaison
  
        
  
      return matchesSearchTerm ;
    });
  }

filterEmployees() {
  if (!this.searchTerm && !this.selectedDate) {
  
    this.filteredEmployee = this.conge.slice(0, 10);
  
  } else {
    const selected = this.selectedDate ? new Date(this.selectedDate).toISOString().split('T')[0] : null;

   

    // 🔹 Filtrer Congés (leaves)
    this.filteredEmployee = this.conge
      .filter(leave => 
        (this.searchTerm && leave.reason?.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (selected && (
          (leave.start && leave.start.startsWith(selected)) || 
          (leave.end && leave.end.startsWith(selected))
        ))
      )
      .slice(0, 10);

  
      

    console.log('Date sélectionnée:', this.selectedDate);  // Vérification console
  }
}



   logout() {
    this.authService.logout();   // supprime les tokens
    this.router.navigateByUrl('/login');  // redirection
  }


  onDelete(id: any) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet projet ?')) {
      this.congeservice.deleteEmployee(id).subscribe(() => {
        alert('projet supprimé');
         this.router.navigate(['/dash']); // redirige vers liste
        // recharge ou filtre la liste après suppression
      });
    }
  }

  onEdit(empCode:any) {
    this.router.navigate(['/mod', empCode]); // suppose une page de modification
  }

//pagination 
paginationConfig = {
  itemsPerPage: 10,
  currentPage: 1
};
onPageChange(page: number) {
  this.paginationConfig.currentPage = page;
}



// filtre par mois 
filterByMonth() {
  // Vérifier si un mois et une année ont été sélectionnés
  if (this.selectedMonth && this.selectedYear) {
    // Obtenir l'index du mois sélectionné (1 basé)
    const monthIndex = this.months.indexOf(this.selectedMonth) + 1;
    // Formater le mois avec deux chiffres (ex: "03" pour mars)
    const formattedMonth = monthIndex.toString().padStart(2, '0');
    // Construire la chaîne "YYYY-MM"
    const selectedMonthYear = `${this.selectedYear}-${formattedMonth}`;

    // Filtrer les données en fonction de la date
    

    this.filteredEmployee = this.conge
      .filter(l =>
        (l.start && l.start.startsWith(selectedMonthYear)) ||
        (l.end && l.end.startsWith(selectedMonthYear))
      )
      .slice(0, 10);

    console.log('📆 Filtrage par mois/année :', selectedMonthYear);
  } else {
  
    this.filteredEmployee = this.conge.slice(0, 10);
   
  }
}
reloadPage() {
  
  window.location.reload();
}


selectedSource: string = 'all';
availableSources: string[] = [];
filterBySource() {
  if (this.selectedSource === 'all') {
    this.filteredEmployee = this.conge;
  } else {
    this.filteredEmployee = this.conge.filter(conge => conge.source === this.selectedSource);
  }
}

}


