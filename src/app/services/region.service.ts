import { Region } from './../models/region.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environment/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private base_url : string = environment.base_url;
  constructor(private http : HttpClient) { }

  getRegiones(): Observable<Region[]>{
    return this.http.get<Region[]>(`${this.base_url}/regiones`)
  }
}
