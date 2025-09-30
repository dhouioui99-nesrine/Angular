import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterResponse, RegisterRequest , AuthenticationRequest} from '../Model/Auth.model';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

private baseURL = "http://localhost:9000/api/auth";
  constructor(private http: HttpClient) {}

register(data: RegisterRequest): Observable<RegisterResponse> {
  return this.http.post<RegisterResponse>(`${this.baseURL}/signup`, data);
}

  checkEmpCodeExists(empCode: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseURL}/check-empcode`, {
      params: { empCode }
    });
  }
checkEmailExists(email: string): Observable<boolean> {
  return this.http.get<boolean>(`${this.baseURL}/check-email`, {
    params: { email }
  });
}

 private userRole: string | null = null;

 
   // 1. LOGIN
   login(email: string, password: string): Observable<RegisterResponse> {
    const payload: AuthenticationRequest = { email, password };
    return this.http.post<RegisterResponse>(`${this.baseURL}/login`, payload);
  }


  // 2. VERIFICATION DU CODE 2FA
  verifyTwoFactor(email: string, code: string): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseURL}/verify`, {
      email,
      code
    });
  }

  // 3. SAUVEGARDE DU TOKEN DANS localStorage
  setToken(token: string): void {
    if (token) {
      localStorage.setItem('access_token', token);
    }
  }

  // 4. RÉCUPÉRER LE TOKEN
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // 5. SUPPRIMER LE TOKEN (logout)
  clearToken(): void {
    localStorage.removeItem('access_token');
  }

  // 6. DÉCODER LE ROLE DU TOKEN
  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded?.role || decoded?.roles?.[0] || null;
    } catch (error) {
      console.error('Invalid token passed to getRole:', token);
      return null;
    }
  }

  // 7. VÉRIFIER SI CONNECTÉ
  isAuthenticated(): boolean {
    return !!this.getToken();
  }


    // 🚪 Déconnexion
 logout(): void {
    localStorage.clear(); // supprime tokens, empCode, email, etc.
  }
}


