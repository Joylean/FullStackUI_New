import { Injectable } from '@angular/core';
import { Designation } from '../models/designation.model';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DesignationServiceService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http:HttpClient) { }

  getAllDesignations(): Observable<Designation[]>{
    return this.http.get<Designation[]>(this.baseApiUrl + '/api/Designation');
  }
}
