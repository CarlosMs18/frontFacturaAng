
import { RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { DetalleClienteComponent } from './detalle-cliente/detalle-cliente.component';




@NgModule({
  declarations: [

    ClientesComponent,
    ClienteFormComponent,
    PagesComponent,
    DetalleClienteComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentsModule,
    PipesModule

  ]
})
export class PagesModule { }
