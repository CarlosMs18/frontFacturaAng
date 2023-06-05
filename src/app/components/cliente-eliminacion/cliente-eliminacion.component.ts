import { Component, Input , Output , EventEmitter} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente.model';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-cliente-eliminacion',
  templateUrl: './cliente-eliminacion.component.html',
  styleUrls: ['./cliente-eliminacion.component.css']
})
export class ClienteEliminacionComponent {
  @Input()
  cliente !: Cliente;

  @Output()
  public confirmarEliminacion : EventEmitter<Cliente> = new EventEmitter();

  constructor(
    public modalService: ModalService,
    private toastr : ToastrService
  ){

  }

  eliminacionConfirmar(cliente :Cliente) : void{

    this.confirmarEliminacion.emit(cliente);

  }

  cerrarModal(){
    this.modalService.cerrarModal();
  }
}
