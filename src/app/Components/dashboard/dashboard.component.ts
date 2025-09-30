import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { DepartementService } from 'src/app/Service/departement.service';
import { EmplService } from 'src/app/Service/empl.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

 empCode: string | null = null;
  lastname: string | null = null;

employeeCount: number = 0;
leave: number = 0;
att: number = 0;
conge: number = 0;
dep: number = 0;
pro: number = 0;

 constructor(private authService: AuthServiceService, private employeeService: EmplService ,private router: Router, private departmentService: DepartementService) {}
  /* constructor(
      private employeeService: EmployeeService ,
   
   //   private leavesservice : LeaveService,
      private congeService : CongeServiceService,
      private departementservice : DepartementService,
      private attservice : AttendanceServiceService,
      private projetService : ProjectService,
      private router: Router
    
   )  { }*/

  ngOnInit(): void {
    
    this.empCode = localStorage.getItem('empCode');
    this.lastname = localStorage.getItem('lastname');
  }

/*
  ngOnInit(): void {
this.getEmployeeData();
this.getAttendanceData();
this.getLeaveData();
this.getCongeData();
this.getDepartementeData();
this.getProjetData();
  }

  public pieChartData: ChartData<'pie', number[], string> = {
    labels: ['Présent', 'Absent', 'Télétravail', 'Congé', 'Département', 'Projet'],
    datasets: [{
      data: [], // sera rempli dans ngOnInit
      backgroundColor: [
        '#4CAF50', // Présent
        '#F44336', // Absent
        '#2196F3', // Télétravail
        '#FFC107', // Congé
        '#9C27B0', // Département
        '#00BCD4'  // Projet
      ],
    }]
  };
  
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      }
    }
  };
  getEmployeeData(): void {
    this.employeeService.getEmployeeCount().subscribe(count => {
      this.employeeCount = count;
    });
  }

  getLeaveData(): void {
    this.leavesservice.getEmployeeCount().subscribe(count => {
      this.leave = count;
    });
  }

  getAttendanceData(): void {
    this.attservice.getEmployeeCount().subscribe(count => {
      this.att = count;
    });
  }

  getCongeData(): void {
    this.congeService.getEmployeeCount().subscribe(count => {
      this.conge = count;
    });
  }

  getDepartementeData(): void {
    this.departementservice.getEmployeeCount().subscribe(count => {
      this.dep = count;
    });
  }

  getProjetData(): void {
    this.projetService.getEmployeeCount().subscribe(count => {
      this.pro = count;
    });
  }


  logout() {
    // Supprimer le token (ex: JWT) ou session locale
    localStorage.removeItem('token'); // ou sessionStorage.clear();
    
    // Rediriger vers la page de login ou home
    this.router.navigate(['/login']);
  }*/

      logout() {
    this.authService.logout();   // supprime les tokens
    this.router.navigateByUrl('/');  // redirection
  }

}