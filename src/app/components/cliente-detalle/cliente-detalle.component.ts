import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente.model';
import { Factura } from 'src/app/models/factura.model';
import { FacturasService } from 'src/app/services/facturas.service';
import { ModalService } from 'src/app/services/modal.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-cliente-detalle',
  templateUrl: './cliente-detalle.component.html',
  styleUrls: ['./cliente-detalle.component.css']
})
export class ClienteDetalleComponent implements OnInit, OnChanges{

  public fotoSeleccionada !: File | null;
  public fotoForm : FormGroup

  public clienteRecibido!: Cliente;

  public facturaEliminacionSeleccionada! :Factura;

  @Input()
  cliente !: Cliente;
  constructor(
    public modalService: ModalService,
    private toastr : ToastrService,
    private fb : FormBuilder,
    private uploadService : UploadService,
    private facturaService : FacturasService
  ){




    this.fotoForm  = this.fb.group({
      foto : ['']
    })
  }
  ngOnInit(): void {

  }
  ngOnChanges(): void {
     this.clienteRecibido = this.cliente;

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


  abrirEliminarFactura(factura : Factura){

      this.facturaEliminacionSeleccionada = factura;
      this.modalService.abrirModalEliminacion()
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

  confirmarFacturaEliminacion(factura : Factura){
      this.facturaService.deleteFactura(factura.id!)
            .subscribe(
              {
                next : response => {
                  this.toastr.success(`Factura Nª${factura.id} eliminado con exito!`, "Factura Eliminada");
                  this.modalService.cerrarModalEliminacion();
                  this.filtrarFacturas(factura)
                  /* this.cliente.facturas = this.cliente.facturas.filter(facturaOriginal => {
                    if(facturaOriginal.id == factura.id ){
                       return null;
                    }

                   return facturaOriginal
                 }) */
                }
              }
            )
    /* this.cliente.facturas = this.cliente.facturas.filter(facturaOriginal => {

        if(facturaOriginal.id == factura.id ){

           return null;
        }

        return facturaOriginal
     }) */

  }


  filtrarFacturas(factura : Factura){
    this.cliente.facturas = this.cliente.facturas.filter(facturaOriginal => {
      if(facturaOriginal.id == factura.id ){
         return null;
      }

     return facturaOriginal
   })
  }





}
