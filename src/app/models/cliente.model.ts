import { Region } from './region.model';
import { Factura } from './factura.model';
export class Cliente{
  id? : number;
  nombre? : string;
  apellido ?: string;
  email ?: string;
  foto?: string;
  createAt? : string;
  fecha ?: string;
  region? : Region;
  facturas?: Array<Factura> = [];

}
