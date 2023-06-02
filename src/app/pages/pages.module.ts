
import { RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';



@NgModule({
  declarations: [

    ClientesComponent,
    ClienteFormComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule

  ]
})
export class PagesModule { }
