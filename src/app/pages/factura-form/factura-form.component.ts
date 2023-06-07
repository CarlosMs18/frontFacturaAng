import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, mergeMap, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Factura } from 'src/app/models/factura.model';
import { Product } from 'src/app/models/producto.model';
import { ClientesService } from 'src/app/services/clientes.service';
import { FacturasService } from 'src/app/services/facturas.service';
import { ItemFactura } from 'src/app/models/item-factura.model';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-factura-form',
  templateUrl: './factura-form.component.html',
  styleUrls: ['./factura-form.component.css']
})
export class FacturaFormComponent implements OnInit{
  autoCompleteControl = new FormControl('');
  factura : Factura = new Factura();
  productosFiltrados!: Observable<Product[]>;

  constructor(
    private clienteService : ClientesService,
    private activatedRoute : ActivatedRoute,
    private facturaService : FacturasService,
    private toastr : ToastrService,
    private router : Router
  ){

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next : params => {
         let clienteId = params.get("clienteId");
         this.obtenerClienteFactura(clienteId!);
      }
    })



    this.productosFiltrados = this.autoCompleteControl.valueChanges.pipe(
    /*   startWith(''), */ //mostraria todos los productos sin siquiera filtrar
    //recordar cuando se carga la pag y escribimos es un string pero una vez seleccionada sera un objecto producct
      map((value : any) => {
        return typeof value === 'string' ? value : value.nonbre
      }),
      mergeMap(value => value ?  this._filter(value || '') : []),
    );
  }



  mostrarNombre(producto? : Product) : any /* : string | undefined */{
    return producto? producto.nombre : undefined;
}


  private _filter(value: string): Observable<Product[]> {
    const filterValue = value.toLowerCase();

    return this.facturaService.filtrarProducto(filterValue);
  }


  seleccionarProducto(event: MatAutocompleteSelectedEvent) : void{
      let producto = event.option.value as Product;


      if(this.existeItem(producto.id!)){

          this.incrementarCantidad(producto.id!)
      }else{
        let nuevoItem =  new ItemFactura();
        nuevoItem.producto = producto;

        this.factura.items.push(nuevoItem);



      }


      this.autoCompleteControl.setValue("");
      event.option.focus();
      event.option.deselect();

      }


  actualizarCantidad(id :  number, event : any){
     let cantidad : number  = event.target.value as number;

     if(cantidad == 0){

       return this.eliminarFactura(id)
     }

     this.factura.items = this.factura.items.map((item : ItemFactura) => {
       if(id  == item.producto?.id){
          item.cantidad  = cantidad;
       }
       return item;
     })
  }


  eliminarFactura(id : number) : void{

    this.factura.items = this.factura?.items.filter((item : ItemFactura) => id !== item.producto?.id)
  }

    existeItem(id : number) : boolean{

      let existe = false;
      this.factura.items.forEach((item : ItemFactura) => {


        if(item.producto?.id  === id){

            existe = true;
        }
      })

      return existe;
  }

  incrementarCantidad(id : number) : void{
    this.factura.items = this.factura.items.map((item : ItemFactura) =>{
      if(id === item.producto?.id){
         item.cantidad++;
      }
      return item;
    })
  }

  obtenerClienteFactura(clienteId : string){
    this.clienteService.getCliente(String(clienteId)).subscribe(
      {
        next : response => {
            this.factura.cliente = response.cliente;


        },
        error : (err : HttpErrorResponse) => {
          this.toastr.error(err.error.mensaje , 'Cliente no encontrado!');
          this.router.navigate(['/api']);
        }
      }
     )
  }


  crearFactura(){
    this.facturaService.create(this.factura).subscribe(
      {
        next : response => {
          this.toastr.success("Factura creada de manera exitosa!", "Creado con exito")
          this.router.navigate(['/api']);
        },
        error : (err : HttpErrorResponse) => {

            for (let i = 0; i < err.error.errors.length; i++) {
                this.toastr.error(`${err.error.errors[i]}`,"Error al crear Factura")

            }
        }
      }
    );
  }

}
