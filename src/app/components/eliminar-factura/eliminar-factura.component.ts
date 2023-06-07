import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Factura } from 'src/app/models/factura.model';
import { FacturasService } from 'src/app/services/facturas.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-eliminar-factura',
  templateUrl: './eliminar-factura.component.html',
  styleUrls: ['./eliminar-factura.component.css']
})
export class EliminarFacturaComponent implements  OnChanges{

  public facturaEliminacion!: Factura
  @Input()
  factura! : Factura;


  @Output()
  public confirmarFacturaEliminacion : EventEmitter<Factura> = new EventEmitter();

  constructor(
    public modalService : ModalService,

  ){}


  ngOnChanges(): void {
    this.facturaEliminacion = this.factura;
  }

  eliminarFactura(factura : Factura){
    this.confirmarFacturaEliminacion.emit(factura);
  }

  /* eliminarFactura(Factura : Factura){
    this.facturaService.deleteFactura(this.factura.id!)
            .subscribe(
              {
                next : response => console.log(response),
                error : err => console.log(err)
              }
            )
  } */




  cerrarModalEliminacion(){
    this.modalService.cerrarModalEliminacion();
  }
}
