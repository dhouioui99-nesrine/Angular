import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Projet } from '../Model/Projet.model';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

private baseURL = "http://localhost:9000/api/B3/projet";
 
   constructor(private httpClient: HttpClient) { }
   
   getEmployeeList(): Observable<Projet[]>{
     return this.httpClient.get<Projet[]>(`${this.baseURL}`);
   }

 

  // Fonction pour ajouter
  addEmployee(projet: Projet): Observable<Projet> {
    return this.httpClient.post<Projet>(this.baseURL, projet);
  }
  // 🔄 Update
  updateEmployee(id: number, projet: Projet): Observable<Projet> {
    return this.httpClient.put<Projet>(`${this.baseURL}/${id}`, projet);
  }

  // 🗑️ Supprimer 
  deleteEmployee(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/${id}`);
  }

  getEmployeeById(id: number): Observable<any> {
  return this.httpClient.get(`${this.baseURL}/${id}`);
}
getCount(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseURL}/count`);
  }
}


