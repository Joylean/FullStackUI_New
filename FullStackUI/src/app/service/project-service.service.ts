import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http:HttpClient) { }

  getAllProjects(): Observable<Project[]>{
    return this.http.get<Project[]>(this.baseApiUrl + '/api/Project');
  }
}
