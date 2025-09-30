import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpTimesheet } from '../Model/EmpTimesheet.model';

@Injectable({
  providedIn: 'root'
})
export class EmpTimesheetService {

private baseURL = "http://localhost:9000/api/emptime/matching";
   
     constructor(private httpClient: HttpClient) { }
     
     getEmployeeList(): Observable<EmpTimesheet[]>{
       return this.httpClient.get<EmpTimesheet[]>(`${this.baseURL}`);
     }
     // service.ts
     getcongeByEmpCode(empCode: any): Observable<EmpTimesheet> {
       return this.httpClient.get<EmpTimesheet>(`${this.baseURL}/${empCode}`);
     }
    }