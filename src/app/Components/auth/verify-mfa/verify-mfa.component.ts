import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterResponse } from 'src/app/Model/Auth.model';
import { AuthServiceService } from 'src/app/Service/auth-service.service';

@Component({
  selector: 'app-verify-mfa',
  templateUrl: './verify-mfa.component.html',
  styleUrls: ['./verify-mfa.component.css']
})
export class VerifyMFAComponent {
  email = '';
  code = '';
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthServiceService,
    private router: Router
  ) {
    // Récupérer email dans queryParams et l'affecter à email
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
  }

  verifyMfa() {
    if (!this.code) {
      this.errorMessage = 'Veuillez entrer le code MFA';
      return;
    }

    this.authService.verifyTwoFactor(this.email, this.code).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.accessToken);
          
        this.router.navigate(['/dash']);
      },
      error: () => {
        this.errorMessage = 'Code MFA invalide';
      }
    });
  }



}
