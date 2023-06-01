import { ClientesService } from './../../services/clientes.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {

  constructor(private clienteService : ClientesService){

    this.clienteService.getClientes()
      .subscribe(data => console.log(data))
  }
}
