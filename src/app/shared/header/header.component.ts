import { Component } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private clienteService : ClientesService){}

  buscarClientes(termino : string){

    this.clienteService.inputValue.emit(termino)
    /*   this.clienteService.getSearchCliente(termino)
            .subscribe(response => console.log(response))
 */
  }

}
