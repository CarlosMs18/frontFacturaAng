import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Factura } from 'src/app/models/factura.model';
import { FacturasService } from 'src/app/services/facturas.service';

@Component({
  selector: 'app-factura-detalle',
  templateUrl: './factura-detalle.component.html',
  styleUrls: ['./factura-detalle.component.css']
})
export class FacturaDetalleComponent {

  public factura!: Factura;
  constructor(
    private activatedRoute : ActivatedRoute,
    private facturasService : FacturasService
  ){
    this.activatedRoute.paramMap.subscribe(
      {
        next : params => {
          let id = +params.get('id')!;
          this.obtenerFactura(id);
         /*  this.facturasService.getFactura(id).subscribe({
            next : factura => this.factura = factura
          }) */
        }
      }
    )
  }

  obtenerFactura(id : number){
    this.facturasService.getFactura(id).subscribe(
      {
      next : (factura : any ) => {
        this.factura = factura;

      }
      }
    )
  }
}
