import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Paginacion } from 'src/app/interface/paginacion.interface';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.css']
})
export class PaginadorComponent implements OnInit{


  @Input()
  paginacion! : Paginacion;
  paginas : number[] = [];
  desde : number = 0;
  hasta : number = 0;

  ngOnInit(): void {
    this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let paginadorActualizado = changes['paginacion'];
    if(paginadorActualizado.previousValue){ //si el paginador  actu tiene una version anterior, que haya cambiado
      this.initPaginator()

    }
  }

  private initPaginator(){

    this.desde =Math.min(Math.max(1,this.paginacion.number-4), this.paginacion.totalPages-5);
    this.hasta = Math.max(Math.min(this.paginacion.totalPages,this.paginacion.number +4), 6);

    if(this.paginacion.totalPages > 5){
      this.paginas = new Array(this.hasta - this.desde +1).fill(0).map((valor, indice) => indice+ this.desde);

    }else{
      this.paginas = new Array(this.paginacion.totalPages).fill(0).map((valor, indice) => indice+1);
    }


  }
}
