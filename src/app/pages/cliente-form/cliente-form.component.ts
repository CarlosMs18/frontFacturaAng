import { Cliente } from './../../models/cliente.model';
import { Region } from './../../models/region.model';
import { RegionService } from './../../services/region.service';
import { ClientesService } from './../../services/clientes.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public clienteForm : FormGroup
  public regionesList : Region[] = [];
  public regionSeleccionada!: any;

  constructor(
    private fb: FormBuilder,
    private clienteService : ClientesService,
    private regionService : RegionService,
    private toastr : ToastrService,
    private router : Router

  ){
    this.clienteForm = this.fb.group({
        nombre : ['', [Validators.required, Validators.minLength(7)]],
        apellido : ['', Validators.required],
        email : ['',[Validators.required, Validators.pattern(this.emailPattern)]],
        fecha : ['',[Validators.required, Validators.minLength(7)]],
        region : ['', Validators.required]
    })
  }
  ngOnInit(): void {
      this.getRegiones();

      this.clienteForm.get('region')?.valueChanges
              .subscribe((regionId : any) =>{
                this.regionSeleccionada = this.regionesList.filter(region => region.id == regionId);
                console.log(this.regionSeleccionada)
              })
  }
  crearCliente(){


    if(this.clienteForm.invalid){
      this.clienteForm.markAllAsTouched();
      return;
    }

    const data : Cliente = {
      nombre : this.clienteForm.get('nombre')?.value,
      apellido : this.clienteForm.get('apellido')?.value,
      email : this.clienteForm.get('email')?.value,
      createAt : this.clienteForm.get('fecha')?.value,
      region : this.regionSeleccionada[0]

    }

    this.clienteService.postCliente(data)
            .subscribe(
              {
                next : response => {
                  this.toastr.success(response.mensaje , "Cliente Nuevo");
                  this.router.navigate(['/api']);
                },
                error : (error : HttpErrorResponse ) => {

                    if(error.error.errors){
                      this.toastr.error(error.error.errors, "Error al crear cliente")

                      return;
                    }
                    if(error.error.mensaje){
                      this.toastr.error(error.error.mensaje, "Error al crear cliente")

                      return;
                    }


                }
              }
            )
  }

  resetear(){
      this.clienteForm.reset()
      console.log(this.clienteForm.value)
  }


  getRegiones(){
    this.regionService.getRegiones()
    .subscribe(
      {
        next: (regiones : Region[]) => {
          this.regionesList = regiones;
        }
      }
    )
  }
}
