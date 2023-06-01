import { Cliente } from './cliente.model';
import { Region } from './region.model';
export class Factura{
  id?: number;
  descripcion! : string;
  observacion! : string;
  createAt! : string;
  cliente! :Cliente;



}
