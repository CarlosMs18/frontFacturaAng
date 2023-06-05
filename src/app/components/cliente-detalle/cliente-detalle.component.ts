import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente.model';
import { ModalService } from 'src/app/services/modal.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-cliente-detalle',
  templateUrl: './cliente-detalle.component.html',
  styleUrls: ['./cliente-detalle.component.css']
})
export class ClienteDetalleComponent {

  public fotoSeleccionada !: File | null;
  public fotoForm : FormGroup


  @Input()
  cliente !: Cliente;
  constructor(
    public modalService: ModalService,
    private toastr : ToastrService,
    private fb : FormBuilder,
    private uploadService : UploadService
  ){

    this.fotoForm  = this.fb.group({
      foto : ['']
    })
  }


  seleccionarFoto(event : any){

    this.fotoSeleccionada = event.target.files[0];
    if(this.fotoSeleccionada!.type.indexOf('image') < 0){
      this.toastr.info("El archivo seleccionado no es una imagen, seleccione una imagen!", "Archivo Error")
      this.fotoSeleccionada = null;
      this.fotoForm.reset();
      return;
    }
  }

  subirFoto(){
    this.uploadService.subirFoto(this.fotoSeleccionada!, String(this.cliente.id))
            .subscribe(
              {
                next : response => {
                  this.toastr.success(response.mensaje , "Imagen Subida");
                  this.uploadService.notificarUpload.emit(response.cliente);
                }
              }
            )
  }

  cerrarModal(){
    if(this.fotoSeleccionada){

      this.fotoSeleccionada = null;
      this.modalService.cerrarModal();
      this.fotoForm.reset();
      return;
    }


    this.modalService.cerrarModal();
  }
}
