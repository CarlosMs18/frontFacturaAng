import { RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [

    ClientesComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule

  ]
})
export class PagesModule { }
