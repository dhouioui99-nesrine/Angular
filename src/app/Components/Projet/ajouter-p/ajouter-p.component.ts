import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Projet } from 'src/app/Model/Projet.model';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { ProjetService } from 'src/app/Service/projet.service';

@Component({
  selector: 'app-ajouter-p',
  templateUrl: './ajouter-p.component.html',
  styleUrls: ['./ajouter-p.component.css']
})
export class AjouterPComponent {

 projet: Projet = {
  
    id : 0 ,
       name : "" ,
        description  : "" ,
        status : "" ,
      
  };


  constructor(
    private projetservice: ProjetService,
 
    private authService: AuthServiceService,private router: Router,
  ) {}


  ngOnInit(): void {
    
  }

 

  onSubmit() {
    this.projetservice.addEmployee(this.projet).subscribe({
      next: (response) => {
        console.log('projet ajouté avec succès:', response);
        alert('projet ajouté avec succès!');
         this.router.navigate(['/listP']); // redirige vers liste
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout de projet :', error);
        alert('Erreur lors de l\'ajout de projet .');
      }
    });
  }

   logout() {
    this.authService.logout();   // supprime les tokens
    this.router.navigateByUrl('/login');  // redirection
  }


}

