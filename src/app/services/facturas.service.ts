import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { Factura } from '../models/factura.model';
import { Product } from '../models/producto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  private base_url : string = environment.base_url;
  constructor(
    private http : HttpClient
  ) { }

  getFactura(id : number){
    return this.http.get<Factura>(`${this.base_url}/facturas/${id}`)
  }

  create(factura  : Factura) : Observable<Factura>{
    return this.http.post<Factura>(`${this.base_url}/facturas`,factura);
  }

  deleteFactura(id : number){
    return this.http.delete(`${this.base_url}/facturas/${id}`)
  }

  filtrarProducto(termino : string): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.base_url}/facturas/filtrar-productos/${termino}`)
  }

}
