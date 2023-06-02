import { Cliente } from './../models/cliente.model';
import { environment } from './../../environment/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable , catchError} from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private base_url : string = environment.base_url;

  constructor(private http : HttpClient) {
    console.log(this.base_url)
  }

  getClientes():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.base_url}/clientes`)
  }

  postCliente(cliente : Cliente){
    console.log(cliente)
    return this.http.post<{mensaje : string,cliente_creado : Cliente }>(`${this.base_url}/clientes`, cliente);

  }

  deleteCliente(cliente : Cliente):Observable<void>{
    return this.http.delete<void>(`${this.base_url}/clientes/${cliente.id}`)

  }
}
