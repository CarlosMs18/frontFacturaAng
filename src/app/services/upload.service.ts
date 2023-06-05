import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private base_url = environment.base_url;

  private _notificarUpload = new EventEmitter<Cliente>();



  constructor(
    private http : HttpClient
  ) { }

  get notificarUpload() : EventEmitter<Cliente>{
    return this._notificarUpload;
  }

  subirFoto(archivo : File, id : string){
     const formFata = new FormData();
     formFata.append("archivo",archivo);
     formFata.append("id",id);

     return this.http.post<{cliente : Cliente, mensaje : string}>(`${this.base_url}/clientes/upload`,formFata);
  }
}
