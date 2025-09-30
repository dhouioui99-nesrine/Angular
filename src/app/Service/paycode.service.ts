import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paycode } from '../Model/Paycode.model';

@Injectable({
  providedIn: 'root'
})
export class PaycodeService {

   private baseURL = "http://localhost:9000/api/paycode";
  
    constructor(private httpClient: HttpClient) { }
    
    getEmployeeList(): Observable<Paycode[]>{
      return this.httpClient.get<Paycode[]>(`${this.baseURL}`);
    }
}
