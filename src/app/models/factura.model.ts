import { Cliente } from './cliente.model';
import { ItemFactura } from './item-factura.model';
export class Factura{
  id?: number;
  descripcion! : string ;
  observacion! : string;
  createAt! : string;
  cliente! :Cliente;
  items  : Array<ItemFactura> = []
  total : number = 0;

  calcularTotal(): number{
    this.total =  0;
    this.items.forEach((item : ItemFactura) => {
        this.total = item.calcularImporte()  + this.total;
    })
    return this.total;
  }
}
