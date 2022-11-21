import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Department } from '../models/department.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentServiceService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http:HttpClient) { }

  getAllDepartments(): Observable<Department[]>{
    return this.http.get<Department[]>(this.baseApiUrl + '/api/Department');
  }
}
