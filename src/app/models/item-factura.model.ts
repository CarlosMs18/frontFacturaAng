import { Product } from "./producto.model";

export class ItemFactura{
  id? : number;
  cantidad: number = 1;
  producto?:Product;
  importe? : number;


  public calcularImporte() : number{
    return this.cantidad * this.producto?.precio!;
  }
}
