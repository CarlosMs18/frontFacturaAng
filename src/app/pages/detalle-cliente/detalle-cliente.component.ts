import { Component, Input } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.css']
})
export class DetalleClienteComponent {

  @Input()
  cliente !: Cliente;
  constructor(
    public modalService: ModalService
  ){

  }


  cerrarModal(){
    this.modalService.cerrarModal();
  }


}
