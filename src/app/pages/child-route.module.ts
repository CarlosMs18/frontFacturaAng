import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClientesComponent } from './clientes/clientes.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';



const routes: Routes = [
  {path : '', component : ClientesComponent},
  {path : 'clientes-form',component :ClienteFormComponent},
  {path : 'clientes-form/:id',component : ClienteFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChildRoutingModule {}
