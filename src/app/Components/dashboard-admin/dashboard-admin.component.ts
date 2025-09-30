import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { CongeService } from 'src/app/Service/conge.service';
import { DepartementService } from 'src/app/Service/departement.service';
import { EmplService } from 'src/app/Service/empl.service';
import { ProjetService } from 'src/app/Service/projet.service';
import { TacheService } from 'src/app/Service/tache.service';
import { ChartOptions, ChartData } from 'chart.js';
@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit{


 employeeCount: number = 0;
  conge: number = 0;
  tache: number = 0;
  pro: number = 0;
  teletravail2025: number = 0;
  ordre2025: number = 0;

  public pieChartData: ChartData<'pie', number[], string> = {
    labels: ['Présent', 'Absent', 'Télétravail', 'Congé', 'Département', 'Projet'],
    datasets: [{
      data: [], // rempli dans ngOnInit
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

  public pieChartType: 'pie' = 'pie';

  constructor(
    private authService: AuthServiceService,
    private employeeService: EmplService,
    private router: Router,
    private departmentService: DepartementService,
    private congeService: CongeService,
    private emplservice: EmplService,
    private projetservice: ProjetService,
    private tacheservice: TacheService
  ) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData(): void {
    // récupérer tous les counts
    this.getEmployeeData();
    this.getCongeData();
    this.getCongetele();
    this.getCongeOrdre();
    this.getProjetData();
    this.getTacheData();
  }

  updatePieChartData(): void {
    this.pieChartData.datasets[0].data = [
      this.employeeCount,   // Présent
      0,                    // Absent (mettre la vraie valeur si dispo)
      this.teletravail2025, // Télétravail
      this.conge,           // Congé
      this.ordre2025,       // Département
      this.pro              // Projet
    ];
  }

  getEmployeeData(): void {
    this.emplservice.getCount().subscribe(count => {
      this.employeeCount = count;
      this.updatePieChartData();
    });
  }

  getCongeData(): void {
    this.congeService.getCongeCountByYear(2024).subscribe(count => {
      this.conge = count;
      this.updatePieChartData();
    });
  }

  getCongetele(): void {
    this.congeService.getTeletravailCountByYear(2024).subscribe(count => {
      this.teletravail2025 = count;
      this.updatePieChartData();
    });
  }

  getCongeOrdre(): void {
    this.congeService.getOrdreCountByYear(2024).subscribe(count => {
      this.ordre2025 = count;
      this.updatePieChartData();
    });
  }

  getProjetData(): void {
    this.projetservice.getCount().subscribe(count => {
      this.pro = count;
      this.updatePieChartData();
    });
  }

  getTacheData(): void {
    this.tacheservice.getCount().subscribe(count => {
      this.tache = count;
      this.updatePieChartData();
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

}