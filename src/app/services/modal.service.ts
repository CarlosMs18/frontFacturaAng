import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalEliminacion : boolean = false;
  modal : boolean = false;
  constructor() { }

  abrirModalEliminacion(){
    this.modalEliminacion = true;
  }

  cerrarModalEliminacion(){
    this.modalEliminacion = false;
  }


  abrirModal(){
    this.modal = true;
  }

  cerrarModal(){
    this.modal = false;
  }
}
