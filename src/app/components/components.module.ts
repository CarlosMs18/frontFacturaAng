import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginadorComponent } from './paginador/paginador.component';
import { RouterModule } from '@angular/router';
import { ClienteDetalleComponent } from './cliente-detalle/cliente-detalle.component';
import { PipesModule } from '../pipes/pipes.module';
import { ClienteEliminacionComponent } from './cliente-eliminacion/cliente-eliminacion.component';




@NgModule({
  declarations: [
    PaginadorComponent,
    ClienteDetalleComponent,
    ClienteEliminacionComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule
  ],
  exports :[
    PaginadorComponent,
    ClienteDetalleComponent,
    ClienteEliminacionComponent


  ]
})
export class ComponentsModule { }
