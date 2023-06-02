import { ActivatedRoute } from '@angular/router';
import { Cliente } from './../../models/cliente.model';
import { ClientesService } from './../../services/clientes.service';
import { Component, OnInit } from '@angular/core';
import { Paginacion } from 'src/app/interface/paginacion.interface';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public clientes : Cliente[] = [];
  public cargando : boolean = true;
  public paginacion!: Paginacion;
  constructor(
    private clienteService : ClientesService,
    private activatedRoute : ActivatedRoute
  ){



  }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      {
        next : params => {
         let page  = +params.get('page')!;
         if(!page){
          page = 0;
         }

         this.obtenerClientes(page)
        }
      }
    )


  }


  obtenerClientes(page : number){
    this.clienteService.getClientes(page)
    .subscribe(
      {
        next : (response) => {
            console.log(response)
              this.clientes = response.content;
              this.cargando = false;
              this.paginacion = response
        }
      }
    )

  }


  eliminarCliente(cliente : Cliente){
    this.clienteService.deleteCliente(cliente)
        .subscribe(
          {
            next :(response : void) => {
              console.log(response)
              this.clientes = this.clientes.filter(client => client.id != cliente.id);
              console.log(this.clientes)
            }
          }
        )
  }

  click(){
  console.log('e')
  }
}
