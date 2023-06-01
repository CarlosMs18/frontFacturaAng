import { environment } from './../../environment/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private base_url : string = environment.base_url;

  constructor(private http : HttpClient) {
    console.log(this.base_url)
  }

  getClientes(){
    return this.http.get(`${this.base_url}/clientes`)
  }
}
