import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente.model';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-cliente-detalle',
  templateUrl: './cliente-detalle.component.html',
  styleUrls: ['./cliente-detalle.component.css']
})
export class ClienteDetalleComponent {

  public fotoSeleccionada !: File | null;

  @Input()
  cliente !: Cliente;
  constructor(
    public modalService: ModalService,
    private toastr : ToastrService
  ){

  }


  seleccionarFoto(event : any){
    this.fotoSeleccionada = event.target.files[0];
    if(this.fotoSeleccionada!.type.indexOf('image') < 0){
      this.toastr.info("El archivo seleccionado no es una imagen, seleccione una imagen!", "Archivo Error")
      this.fotoSeleccionada = null;
  }
  }

  cerrarModal(){
    this.modalService.cerrarModal();
  }
}
