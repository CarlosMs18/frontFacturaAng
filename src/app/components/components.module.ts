import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginadorComponent } from './paginador/paginador.component';
import { RouterModule } from '@angular/router';
import { ClienteDetalleComponent } from './cliente-detalle/cliente-detalle.component';
import { PipesModule } from '../pipes/pipes.module';
import { ClienteEliminacionComponent } from './cliente-eliminacion/cliente-eliminacion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EliminarFacturaComponent } from './eliminar-factura/eliminar-factura.component';




@NgModule({
  declarations: [
    PaginadorComponent,
    ClienteDetalleComponent,
    ClienteEliminacionComponent,
    EliminarFacturaComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule,
    ReactiveFormsModule
  ],
  exports :[
    PaginadorComponent,
    ClienteDetalleComponent,
    ClienteEliminacionComponent,

    EliminarFacturaComponent


  ]
})
export class ComponentsModule { }
