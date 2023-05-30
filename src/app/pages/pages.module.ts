
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { PagesComponent } from './pages.component';



@NgModule({
  declarations: [
    ProductComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,

  ]
})
export class PagesModule { }
