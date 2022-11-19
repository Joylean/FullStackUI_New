import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiurl='https://localhost...';

  constructor(private http:HttpClient) { }

  getEmployees(): Observable<Employee>{
    return this.http.get<Employee>(this.apiurl);
  }
}