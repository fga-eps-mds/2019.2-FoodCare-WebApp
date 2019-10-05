import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Alimento } from './adiciona-alimento.interface';
import { Categoria } from './adiciona-alimento.interface';

@Component({
  selector: 'app-adiciona-alimento',
  templateUrl: './adiciona-alimento.component.html',
  styleUrls: ['./adiciona-alimento.component.css']
})

export class AdicionaAlimentoComponent implements OnInit {

  alimento: Alimento[];
  id_evento: number = 1;
  id_categoria: number[];
  categoria: Categoria[];
  error: any;
  un_medida: string = '';
  UnMedida: any=['Unidade', 'Kg', 'L'];

  constructor(private api: ApiService) { }

  ngOnInit() {
   this.api.getAlimento().subscribe(
     (alimento: Alimento[]) => this.alimento = alimento,
     (error: any) => this.error = error
   );
   this.api.getCategoria().subscribe(
     (categoria: Categoria[]) => this.categoria = categoria,
   );
 }

 delAlimento(id: number) {
   this.api.deletaAlimento(id).subscribe(
     (success: any) => this.alimento.splice(
       this.alimento.findIndex(alimento => alimento.id === id)
     )
   );
 }
 adAlimento(itemNome: any, itemQuantidade: any) {
   console.log(this.id_categoria);
   console.log(this.un_medida);
   console.log(this.id_evento);
   console.log(itemNome);
   console.log(itemQuantidade);
   this.api.adicionaAlimento( this.id_evento, this.id_categoria, itemNome, this.un_medida, itemQuantidade ).subscribe(
     (alimento: Alimento) => this.alimento.push(alimento)
   );
 }

 editAlimento(id: number, itemNome: any, itemQuantidade: any){
   this.api.editaAlimento(id, this.id_evento, this.id_categoria, itemNome, this.un_medida, itemQuantidade ).subscribe(
     (success: any) => this.alimento.splice(
       this.alimento.findIndex(alimento => alimento.id === id)
     )
   );
 }
}
