import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Departement } from '../Model/Departement.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

private baseURL = "http://localhost:9000/api/dep";

  constructor(private httpClient: HttpClient) { }
  
  getDepartments(): Observable<Departement[]> {
    return this.httpClient.get<Departement[]>(this.baseURL);
  }

}
