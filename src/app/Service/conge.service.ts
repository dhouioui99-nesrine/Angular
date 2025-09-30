import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conge } from '../Model/Conge.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CongeService {

  private baseURL = "http://localhost:9000/api/B3";
 
   constructor(private httpClient: HttpClient) { }
   
   getEmployeeList(): Observable<Conge[]>{
     return this.httpClient.get<Conge[]>(`${this.baseURL}`);
   }

 

  // Fonction pour ajouter un employé
  addEmployee(conge: Conge): Observable<Conge> {
    return this.httpClient.post<Conge>(this.baseURL, conge);
  }
  // 🔄 Update un employé
  updateEmployee(empCode: string, conge: Conge): Observable<Conge> {
    return this.httpClient.put<Conge>(`${this.baseURL}/${empCode}`, conge);
  }

  // 🗑️ Supprimer un employé
  deleteEmployee(empCode: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/${empCode}`);
  }

  getEmployeeByCode(empCode: string): Observable<any> {
  return this.httpClient.get(`${this.baseURL}/${empCode}`);
}
getCongeCount(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseURL}/count`);
  }

  getCongeCountByYear(year: number): Observable<number> {
  return this.httpClient.get<number>(`${this.baseURL}/count/${year}`);
}
getTeletravailCountByYear(year: number): Observable<number> {
  return this.httpClient.get<number>(`${this.baseURL}/count/teletravail/${year}`);
}
getOrdreCountByYear(year: number): Observable<number> {
  return this.httpClient.get<number>(`${this.baseURL}/count/ordre/${year}`);
}
}
