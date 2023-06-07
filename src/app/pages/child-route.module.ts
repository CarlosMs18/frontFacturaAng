import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClientesComponent } from './clientes/clientes.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FacturaDetalleComponent } from './factura-detalle/factura-detalle.component';
import { FacturaFormComponent } from './factura-form/factura-form.component';



const routes: Routes = [
  {path : '', component : ClientesComponent},
  {path : 'clientes/page/:page',component: ClientesComponent},
  {path : 'clientes-form',component :ClienteFormComponent},
  {path : 'clientes-form/:id',component : ClienteFormComponent},
  {path : 'factura-detalle/:id',component: FacturaDetalleComponent},
  {path : 'factura-form/:clienteId',component: FacturaFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChildRoutingModule {}
