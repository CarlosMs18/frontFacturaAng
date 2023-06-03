import { Cliente } from './../models/cliente.model';
import { environment } from './../../environment/environment';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable , catchError} from 'rxjs'
import { Paginacion } from '../interface/paginacion.interface';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private base_url : string = environment.base_url;
  private _inputValue = new EventEmitter<string>()
  constructor(private http : HttpClient) {
    console.log(this.base_url)
  }


  get inputValue(){
    return this._inputValue;
  }
  /* getClientes():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.base_url}/clientes`)
  } */


  getClientes(page : number){
    return this.http.get<Paginacion>(`${this.base_url}/clientes/page/${page}`)
  }



  getCliente(id : string){
    return this.http.get<{mensaje : string, cliente : Cliente}>(`${this.base_url}/clientes/${id}`);
  }



  getSearchCliente(termino : string){
    return this.http.get<any>(`${this.base_url}/clientes/filter/${termino}`);
  }



  postCliente(cliente : Cliente){
    console.log(cliente)
    return this.http.post<{mensaje : string,cliente_creado : Cliente }>(`${this.base_url}/clientes`, cliente);

  }


  updateCliente(cliente : Cliente , idCliente: string){
    return this.http.put<{mensaje : string, cliente_actualizado : Cliente}>(`${this.base_url}/clientes/${idCliente}`, cliente)
  }

  deleteCliente(cliente : Cliente):Observable<void>{
    return this.http.delete<void>(`${this.base_url}/clientes/${cliente.id}`)

  }
}
