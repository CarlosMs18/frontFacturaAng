import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from './../../models/cliente.model';
import { ClientesService } from './../../services/clientes.service';
import { Component, OnInit, Output } from '@angular/core';
import { Paginacion } from 'src/app/interface/paginacion.interface';
import { ModalService } from 'src/app/services/modal.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  @Output()



  page : number = 0;

  public clientes : Cliente[] = [];
  public clientesTemporal : Cliente[] = [];
  public cargando : boolean = true;
  public paginacion!: Paginacion;
  public terminoValue : string = '';

  public clientesEncontrados : Cliente[]  = [];


  public clienteSeleccionado!: Cliente;
  public clienteEliminacion! : Cliente;

  constructor(
    private clienteService : ClientesService,
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private modalService : ModalService,
    private toastr : ToastrService
  ){



  }
  ngOnInit(): void {


    this.activatedRoute.paramMap.subscribe(
      {
        next : params => {
          this.page  = +params.get('page')!;

         if(!this.page){
          this.page = 0;
         }

         if(this.page < 0){
          this.page = 0
         }

         this.obtenerClientes(this.page)
        }
      }
    )



    this.clienteService.inputValue.subscribe((termino : string) => {

        if(termino.length === 0){

          this.clientes = this.clientesTemporal
          return;
        }

        this.clienteService.getSearchCliente(termino)
            .subscribe(
              {
                next : (clientes) => {

                    this.clientesEncontrados = clientes;
                    this.clientes = clientes;
                }
              }
            )


    })

  }


  obtenerClientes(page : number){
    this.clienteService.getClientes(page)
    .subscribe(
      {
        next : (response) => {


              this.clientes = response.content;
              if(this.clientes.length === 0){
                  this.page = this.page - 1
                  if(this.page < 0){
                    this.page = 0
                  }
                  this.router.navigate(['/api/clientes/page/',this.page])


              }

              this.clientesTemporal= response.content;
              this.cargando = false;
              this.paginacion = response
        }
      }
    )

  }
  confirmarEliminacion(cliente : Cliente){
   this.eliminarCliente(cliente);
  }

  eliminarCliente(cliente : Cliente){
    this.clienteService.deleteCliente(cliente)
        .subscribe(
          {
            next :(response : void) => {

              /* this.clientes = this.clientes.filter(client => client.id != cliente.id); */
              this.obtenerClientes(this.page);
              this.modalService.cerrarModal();
              this.toastr.success("El cliente ha sido eliminado con exito", "Registro Eliminado")

            },
            error : (err: HttpErrorResponse) => {
              this.toastr.warning(err.error.mensaje, "Error al eliminar cliente");
              this.obtenerClientes(this.page);
              this.modalService.cerrarModal();
            }
          }
        )
  }

  abrirModal(cliente : Cliente){


      this.clienteSeleccionado = cliente;
      this.clienteEliminacion= null!;
      this.modalService.abrirModal();
  }


  abrirModalEliminacion(cliente: Cliente){
    this.clienteEliminacion = cliente;
    this.clienteSeleccionado= null! ;
    this.modalService.abrirModal();
  }

}
