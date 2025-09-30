import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpTimesheet } from 'src/app/Model/EmpTimesheet.model';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { EmpTimesheetService } from 'src/app/Service/emp-timesheet.service';

@Component({
  selector: 'app-emp-timsheet',
  templateUrl: './emp-timsheet.component.html',
  styleUrls: ['./emp-timsheet.component.css']
})
export class EmpTimsheetComponent implements OnInit {

emptime: EmpTimesheet[] = [];
  empCode: any;
  filtreTime : EmpTimesheet[] = [];


  //date 
  selectedDate: string = '';  // Valeur par défaut vide, tu pourras la changer via l'input
    searchTerm: string = ''; // Terme de recherche
    startDate: string = '2024-01-01';  // La date de début est définie sur le 20 OCTOBRE 2024
  
     selectedMonth: string = 'Mois'; 
     selectedYear: string = '2024';  
    years: string[] = [ '2024','2025'];
    months: string[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  
    @Output() monthYearChanged: EventEmitter<{ month: string, year: string }> = new EventEmitter();
  constructor(private emptimeservice: EmpTimesheetService ,
    private router: Router, 
     private route: ActivatedRoute,
      private authService:AuthServiceService
  

) {  }



ngOnInit(): void {
  // Récupérer l'ID depuis l'URL
  this.empCode = this.route.snapshot.params['empCode'];
  console.log("ID récupéré depuis l'URL :", this.empCode);


  this.getEmpTimesheet();

}



getEmpTimesheet(): void {
  console.log('ID employé utilisé dans la requête:', this.empCode); // <--- ajoute ceci

  this.emptimeservice.getcongeByEmpCode(this.empCode).subscribe({
    next: (data) => {
      this.emptime = Array.isArray(data) ? data : [data];
      console.log('EmpTimes:', this.emptime);
      this.filtreTime = this.emptime;
    },
    error: (error) => {
      console.error('Erreur :', error);
    }
  });
}

////filtreee
/*
filterEmployees() {
  if (!this.searchTerm && !this.selectedDate) {
    // Si aucune date ni terme de recherche, afficher les 10 premiers résultats
    this.filtreTime = this.emptime.slice(0, 10);
   
  } else {
    const selected = this.selectedDate ? new Date(this.selectedDate).toISOString().split('T')[0] : null;

    // 🔹 Filtrer Pointage
    this.filtreTime = this.emptime
      .filter(emp => 
        (this.searchTerm && emp.empCode?.toString().includes(this.searchTerm)) || 
        (this.searchTerm && emp.lastname?.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (selected && emp.start?.startsWith(selected))
      )
      .slice(0, 10);

   
      

    console.log('Date sélectionnée:', this.selectedDate);  // Vérification console
  }
}
*/
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
    this.filtreTime = this.emptime
      .filter(p => p.start?.startsWith(selectedMonthYear));
      

    

   

    console.log('📆 Filtrage par mois/année :', selectedMonthYear);
  } else {
    this.filtreTime = this.emptime;
   
  }
}




logout() {
    this.authService.logout();   // supprime les tokens
    this.router.navigateByUrl('/login');  // redirection
  }
}