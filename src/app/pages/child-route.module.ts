import { ClientesComponent } from './clientes/clientes.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';



const routes: Routes = [
  {path : '', component : ClientesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChildRoutingModule {}
