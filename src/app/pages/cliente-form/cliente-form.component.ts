import { Cliente } from './../../models/cliente.model';
import { Region } from './../../models/region.model';
import { RegionService } from './../../services/region.service';
import { ClientesService } from './../../services/clientes.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public clienteForm : FormGroup;
  public regionesList : Region[] = [];
  public regionSeleccionada!: any;
  public idCliente : string = '';
  public tituloForm : string = "Crear Cliente"
  public clienteRecuperado !: Cliente;
  public nombreBtn : string = "Crear"

  constructor(
    private fb: FormBuilder,
    private clienteService : ClientesService,
    private regionService : RegionService,
    private toastr : ToastrService,
    private router : Router,
    private activateRoute : ActivatedRoute

  ){
    this.clienteForm = this.fb.group({
        nombre : ['', [Validators.required, Validators.minLength(4)]],
        apellido : ['', Validators.required],
        email : ['',[Validators.required, Validators.pattern(this.emailPattern)]],
        fecha : ['',Validators.required],
        region : ['', Validators.required]
    })
  }
  ngOnInit(): void {
      this.getRegiones();

      this.clienteForm.get('region')?.valueChanges
              .subscribe((regionId : number) =>{
                this.regionSeleccionada = this.regionesList.filter(region => region.id == regionId);

              })


      this.activateRoute.params.subscribe(params => {
          let id = params['id'];

          if(id){
           this.idCliente = id;
           this.nombreBtn = "Editar"
           this.getClientePorId(id);
           return;
          }
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
      facturas : [],
      region : this.regionSeleccionada[0]

    }

    if(this.idCliente){

        this.clienteService.updateCliente(data, this.idCliente )

              .subscribe(
                {
                  next : response => {
                    this.toastr.success(response.mensaje , "Cliente Actualizado");
                    this.router.navigate(['/api']);
                  },
                  error : (error : HttpErrorResponse ) => {
                    if(error.error.mensaje){
                      this.toastr.error(error.error.mensaje, "Error al crear cliente")
                      return;
                    }
                }
                }
              )
    }else{
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



  }


  getClientePorId(id : string){
    this.clienteService.getCliente(id)
        .subscribe(
          {
            next : (cliente) => {
              this.tituloForm = `Editar ${cliente.cliente.nombre}`
              this.clienteRecuperado = cliente.cliente;
              this.clienteForm.patchValue({
                nombre : cliente.cliente.nombre,
                apellido :cliente.cliente.apellido,
                email : cliente.cliente.email,
                fecha :  cliente.cliente.createAt,
                region : cliente.cliente.region?.id
              })
            },
            error : (error : HttpErrorResponse ) => {
                if(error.status == 404){
                  this.toastr.info(error.error.mensaje, 'Cliente Inexistente');
                  this.router.navigate(['/api']);

                }
            }


          }
        )

  }

  resetear(){

      if(this.clienteRecuperado){
        this.clienteForm.patchValue({
          nombre : this.clienteRecuperado.nombre,
          apellido: this.clienteRecuperado.apellido,
          email :this.clienteRecuperado.email,
          fecha :this.clienteRecuperado. createAt,
          region: this.clienteRecuperado.region?.id
        })
      }else{
        this.clienteForm.patchValue({
          nombre : '',
          apellido:'' ,
          email :'',
          fecha :'',
          region: ''
        })
      }



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
