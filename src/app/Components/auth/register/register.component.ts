import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/app/Model/Auth.model';
import { AuthServiceService } from 'src/app/Service/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 request = {
    empCode: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    mfaEnabled: false
  };

 

  mfaCode: string = '';
  
 
  qrCode: string = '';
  showVerifyButton: boolean = false;
  errorMessage: string = '';
  empCodeExists: boolean = false;
  emailExists: boolean = false;
errorEmailMessage: string = '';
  constructor(private authService: AuthServiceService, private router: Router) {}


 onRegister() {
    if (this.empCodeExists) return;
    if (this.emailExists) return ;
    this.authService.register(this.request).subscribe({
      next: res => {
        if (res.mfaEnabled && res.secretImageUri) {
          // on stocke l'URI et on affiche le QR + le bouton « Suivant »
          this.qrCode = res.secretImageUri;
          this.showVerifyButton = true;
        } else {
          this.router.navigate(['/login']);
        }
      },
      error: err => {
        console.error('Erreur backend:', err);
  
        if (err.error) {
          if (typeof err.error === 'string') {
            this.errorMessage = err.error;
          } else if (err.error.message) {
            this.errorMessage = err.error.message;
          } else {
            this.errorMessage = 'Erreur lors de l\'inscription : le code employé peut ne pas exister, ou une autre erreur s\'est produite';
          }
        } 
      }
    });
  }





checkEmpCode() {
  if (!this.request.empCode) {
    this.empCodeExists = false;
    this.errorMessage = '';  // Réinitialiser message erreur
    return;
  }

  this.authService.checkEmpCodeExists(this.request.empCode).subscribe({
    next: exists => {
      if (!exists) {
        // empCode n'existe pas → afficher message erreur
        this.empCodeExists = true;
        this.errorMessage = "Ce code employé n'existe pas.";
      } else {
        this.empCodeExists = false;
        this.errorMessage = '';
      }
    },
    error: err => {
      console.error('Erreur lors de la vérification du empCode', err);
      this.empCodeExists = false;
      this.errorMessage = '';
    }
  });
}

checkEmail(): void {
  if (!this.request.email) {
    this.emailExists = false;
    this.errorEmailMessage = ''; // réinitialiser message
    return;
  }

  this.authService.checkEmailExists(this.request.email).subscribe({
    next: exists => {
      if (!exists) {
        // EMAIL n'existe pas → afficher message erreur
        this.emailExists = true;
        this.errorMessage = "email n'existe pas.";
      } else {
        this.emailExists = false;
        this.errorMessage = '';
      }
    },
    error: err => {
      console.error('Erreur lors de la vérification du email', err);
      this.emailExists = false;
      this.errorMessage = '';
    }
  });
}
verifyMfaCode() {
  console.log('Email:', this.request.email);
  console.log('Code:', this.mfaCode);

  if (!this.mfaCode || this.mfaCode.length !== 6) {
    this.errorMessage = 'Veuillez entrer un code MFA valide à 6 chiffres.';
    return;
  }

  if (!this.request.email) {
    this.errorMessage = 'Email manquant, impossible de vérifier le code.';
    return;
  }

  this.authService.verifyTwoFactor(this.request.email, this.mfaCode).subscribe({
    next: (res) => {
      localStorage.setItem('token', res.accessToken);
      this.router.navigate(['/login']);
    },
    error: () => {
      this.errorMessage = 'Code MFA invalide, veuillez réessayer.';
    }
  });
}

}
