import { Injectable } from '@angular/core';
import { Employee } from '../Model/Employee.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

   private baseURL = "http://localhost:9000/api/employees";

  constructor(private httpClient: HttpClient) { }
  
  getEmployeeList(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.baseURL}`);
  }

  
  getEmployeeById(empCode: any): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.baseURL}/${empCode}`);
  }

}
