import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PointageResult } from '../Model/PointageResult.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PointageResultService {


private baseURL = "http://localhost:9000/api/valid-transactions";

  constructor(private httpClient: HttpClient) { }
  
 /* getEmployeeList(): Observable<PointageResult[]>{
    return this.httpClient.get<PointageResult[]>(`${this.baseURL}/valid-transactions`);
  }
*/
    
    getpointageById(empCode: any): Observable<PointageResult> {
      return this.httpClient.get<PointageResult>(`${this.baseURL}/${empCode}`);
    }
   /* getAdditionalDetailsByEmployeeId(id: number): Observable<PointageResult> {
      return this.httpClient.get<PointageResult>(`${this.baseURL}`);
    }*/
}

