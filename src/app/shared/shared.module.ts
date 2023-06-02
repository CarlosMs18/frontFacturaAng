import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { SpinnerComponent } from './spinner/spinner.component';



@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    SpinnerComponent
  ],
  exports :[
     SidebarComponent,
     HeaderComponent,
     SpinnerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
