
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ProductComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule

  ]
})
export class PagesModule { }
