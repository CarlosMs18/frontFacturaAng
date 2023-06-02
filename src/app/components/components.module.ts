import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginadorComponent } from './paginador/paginador.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PaginadorComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports :[
    PaginadorComponent
  ]
})
export class ComponentsModule { }
