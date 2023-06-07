
import { RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { FacturaDetalleComponent } from './factura-detalle/factura-detalle.component';
import { FacturaFormComponent } from './factura-form/factura-form.component';
import { MaterialModule } from '../material/material.module';





@NgModule({
  declarations: [

    ClientesComponent,
    ClienteFormComponent,
    PagesComponent,
    FacturaDetalleComponent,
    FacturaFormComponent


  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    ComponentsModule,
    PipesModule,
    MaterialModule

  ]
})
export class PagesModule { }
