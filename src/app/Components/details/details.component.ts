import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Conge } from 'src/app/Model/Conge.model';
import { Departement } from 'src/app/Model/Departement.model';
import { Empl } from 'src/app/Model/Empl.model';
import { EmpTimesheet } from 'src/app/Model/EmpTimesheet.model';
import { PointageResult } from 'src/app/Model/PointageResult.model';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { CongeService } from 'src/app/Service/conge.service';
import { EmpTimesheetService } from 'src/app/Service/emp-timesheet.service';
import { EmplService } from 'src/app/Service/empl.service';
import { PointageResultService } from 'src/app/Service/pointage-result.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

   @ViewChild('exportable') exportable!: ElementRef;
  empCode : any;
  employees: Empl[] = []; //  employés
  ////////////////
  departments: Departement[] = [];  // départements
  selectedDepartment: string = '';
 /////////////// 
  emptime: EmpTimesheet[] = []; // timesheet
/////////////
  leaves : Conge[] = []; // conges 
  filteredLeaves : Conge[] = [];
 ////////////////

  pointage : PointageResult[] = [];
  filteredPointage: PointageResult[] = []; // Liste filtrée

/////////////
  uniqueAttendances: string[] = [];  // Liste des valeurs uniques de reason
  I: number =1;


  // filtré date
  selectedDate: string = '';  // Valeur par défaut vide, tu pourras la changer via l'input
  searchTerm: string = ''; // Terme de recherche
  startDate: string = '2024-01-01';  // La date de début est définie sur le 20 OCTOBRE 2024
  Day: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
  months: string[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  selectedMonth: string = this.months[new Date().getMonth()];
  years: string[] = [  '2025','2024', '2023' , '2022'];
  selectedYear: string = new Date().getFullYear().toString();
  selectedDay: string = new Date().getDay().toString();
  @Output() monthYearChanged: EventEmitter<{ month: string, year: string }> = new EventEmitter();

  isLoading: boolean = true;   // état initial
  isLoadingConge: boolean = true;
  constructor(
    private router: Router, 
     private route: ActivatedRoute,
  private employeeService: EmplService ,
  private leavesservice : CongeService,
  private pointageservice : PointageResultService,
  private emptimeservice : EmpTimesheetService,
  private authService:AuthServiceService

) { this.selectedDate = this.startDate; 
  }



ngOnInit(): void {
  this.empCode = this.route.snapshot.params['empCode'];
  console.log("ID récupéré depuis l'URL :", this.empCode);

  this.getEmployeeData();
 
  this.getCongeData();
    this.loadPointages();
  this.getPointageData();
  
}

loadPointages() {
  this.isLoading = true;
   this.pointageservice.getpointageById(this.empCode).subscribe(data => {
    this.pointage = Array.isArray(data) ? data : [data];
    this.filteredPointage = this.pointage 
      this.isLoading = false;
  }, error => {
    console.error('Erreur lors de la récupération du pointage:', error);
  });
}

onDateFilterChange() {

  this.monthYearChanged.emit({ month: this.selectedMonth, year: this.selectedDay });
}
// Fonction pour récupérer les employés
getEmployeeData(): void {
  this.employeeService.getEmployeeByCode(this.empCode).subscribe(data => {
    this.employees = Array.isArray(data) ? data : [data];
  }, error => {
    console.error('Erreur lors de la récupération des employés:', error);
  });
}
//Congé
getCongeData(): void {
    this.isLoading = true;
  this.leavesservice.getEmployeeByCode(this.empCode).subscribe(data => {
    this.leaves = Array.isArray(data) ? data : [data];
    this.filteredLeaves = this.leaves 
      this.isLoadingConge = false;
     // Créer dynamiquement la liste des sources uniques
  this.availableSources = Array.from(new Set(this.leaves.map(leave => leave.source)));
  
  // Ajouter une option "Tous" pour afficher tout
  this.availableSources.unshift('all');
  }, error => {
    console.error('Erreur lors de la récupération du congé:', error);
  });
}

//Pointage
getPointageData(): void {
  this.pointageservice.getpointageById(this.empCode).subscribe(data => {
    this.pointage = Array.isArray(data) ? data : [data];
    this.filteredPointage = this.pointage 
    
  }, error => {
    console.error('Erreur lors de la récupération du pointage:', error);
  });
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
    this.filteredPointage = this.pointage
      .filter(p => p.date?.startsWith(selectedMonthYear))
      .slice(0, 10);

    this.filteredLeaves = this.leaves
      .filter(l =>
        (l.start && l.start.startsWith(selectedMonthYear)) ||
        (l.end && l.end.startsWith(selectedMonthYear))
      )
      .slice(0, 10);

    console.log('📆 Filtrage par mois/année :', selectedMonthYear);
  } else {
    // Si aucun mois ou année n'est sélectionné, afficher les 10 premiers éléments
    this.filteredPointage = this.pointage.slice(0, 10);
    this.filteredLeaves = this.leaves.slice(0, 10);
   
  }
}

selectedSource: string = 'all';
availableSources: string[] = [];
filterBySource() {
  if (this.selectedSource === 'all') {
    this.filteredLeaves = this.leaves;
  } else {
    this.filteredLeaves = this.leaves.filter(leave => leave.source === this.selectedSource);
  }
}






//pagination 
paginationConfig = {
  itemsPerPage: 5,
  currentPage: 1
};
onPageChange(page: number) {
  this.paginationConfig.currentPage = page;
}











logout() {
    this.authService.logout();   // supprime les tokens
    this.router.navigateByUrl('/login');  // redirection
  }


  //filtrer date : 
filterEmployees() {
  if (!this.searchTerm && !this.selectedDate) {
    // Si aucune date ni terme de recherche, afficher les 10 premiers résultats
    this.filteredPointage = this.pointage.slice(0, 10);
    this.filteredLeaves = this.leaves.slice(0, 10);
  
  } else {
    const selected = this.selectedDate ? new Date(this.selectedDate).toISOString().split('T')[0] : null;

    // 🔹 Filtrer Pointage
    this.filteredPointage = this.pointage
      .filter(pointage => 
        (this.searchTerm && pointage.empCode?.toString().includes(this.searchTerm)) || 
        (this.searchTerm && pointage.empName?.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (selected && pointage.date?.startsWith(selected))
      )
      .slice(0, 10);

    // 🔹 Filtrer Congés (leaves)
    this.filteredLeaves = this.leaves
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


reloadPage() {
  window.location.reload();
}



exportToPDF() {
    const element = document.getElementById('exportSection');
    if (!element) {
      console.error('Élément exportable non trouvé !');
      return;
    }

    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('rapport_presence.pdf');
    });
  }

}

