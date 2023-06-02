import { Cliente } from "../models/cliente.model";



export interface Paginacion {
  content:          Cliente[];
  pageable:         Pageable;
  totalPages:       number;
  totalElements:    number;
  last:             boolean;
  size:             number;
  number:           number;
  sort:             Sort;
  numberOfElements: number;
  first:            boolean;
  empty:            boolean;
}

/* export interface ClienteP {
  id:       number;
  nombre:   string;
  apellido: string;
  email:    string;
  createAt: Date;
  foto:     null;
  region:   Region;
  facturas: Factura[];
}
 */
/* export interface Factura {
  id:          number;
  descripcion: string;
  observacion: string;
  createAt:    Date;
} */

/* export interface Region {
  id:     number;
  nombre: string;
} */

export interface Pageable {
  sort:       Sort;
  offset:     number;
  pageNumber: number;
  pageSize:   number;
  unpaged:    boolean;
  paged:      boolean;
}

export interface Sort {
  empty:    boolean;
  sorted:   boolean;
  unsorted: boolean;
}
