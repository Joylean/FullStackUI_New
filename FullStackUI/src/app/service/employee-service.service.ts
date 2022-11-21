import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http:HttpClient) { }

  getAllEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.baseApiUrl + '/api/Employee');
  }

  addEmployee(addEmployee: Employee):Observable<Employee[]> {
    return this.http.post<Employee[]>(this.baseApiUrl + '/api/Employee',addEmployee);
  }

  getEmployee(id: number):Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseApiUrl+'/api/Employee/'+id);
  }

  updateEmployee(id: number, updateEmployee:Employee):Observable<Employee[]> {
    return this.http.put<Employee[]>(this.baseApiUrl+'/api/Employee/'+id,updateEmployee);
  }

  deleteEmployee(id: number):Observable<Employee[]> {
    return this.http.delete<Employee[]>(this.baseApiUrl+'/api/Employee/'+id);
  }
}
