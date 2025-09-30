import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Service/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
   email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthServiceService, private router: Router) {}

onLogin() {
  this.authService.login(this.email, this.password).subscribe({
    next: (res) => {
      console.log("Réponse brute backend:", res);
      console.log("Roles reçus:", res.roles);

      if (res.mfaEnabled) {
        // Si MFA activé, rediriger vers la vérification
        this.router.navigate(['/verify'], {
          queryParams: { email: this.email }
        });
        return;
      }

      // Stocker le token dans localStorage
      if (res.accessToken) {
        localStorage.setItem('token', res.accessToken);
        localStorage.setItem('empCode', res.empCode);   // à partir de la réponse backend
      localStorage.setItem('lastname', res.lastname);
      } else {
        console.warn('Aucun token reçu du backend');
      }

      // Assurer que res.roles existe et est un tableau
      const roles = Array.isArray(res.roles) ? res.roles : [];
      console.log("Roles après vérification:", roles);

      // Redirection selon le rôle
      if (roles.includes('ADMIN')) {
        this.router.navigate(['/dashA']).then(nav => {
          if (!nav) console.warn('Redirection admin échouée');
        });
      } else {
        this.router.navigate(['/dash']).then(nav => {
          if (!nav) console.warn('Redirection utilisateur échouée');
        });
      }
    },
    error: (err) => {
      console.error('Erreur login:', err);
      this.errorMessage = 'Email ou mot de passe incorrect.';
    },
  });
}
}