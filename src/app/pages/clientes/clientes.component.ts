import { Cliente } from './../../models/cliente.model';
import { ClientesService } from './../../services/clientes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public clientes : Cliente[] = [];
  public cargando : boolean = true;
  constructor(private clienteService : ClientesService){



  }
  ngOnInit(): void {
    this.obtenerClientes();
  }


  obtenerClientes(){
    this.clienteService.getClientes()
    .subscribe(
         {
          next : (clientesData : Cliente[]) => {
            this.clientes = clientesData
            this.cargando = false;

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
