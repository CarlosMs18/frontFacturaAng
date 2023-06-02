import { Cliente } from './cliente.model';
export class Factura{
  id?: number;
  descripcion! : string;
  observacion! : string;
  createAt! : string;
  cliente! :Cliente;



}
