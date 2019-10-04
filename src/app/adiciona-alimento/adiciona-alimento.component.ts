import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Alimento } from './adiciona-alimento.interface';

@Component({
  selector: 'app-adiciona-alimento',
  templateUrl: './adiciona-alimento.component.html',
  styleUrls: ['./adiciona-alimento.component.css']
})

export class AdicionaAlimentoComponent implements OnInit {

  alimento: Alimento[];
  error: any;
  itemUnMedida: string = '';
  UnMedida: any=['Unidade', 'Kg', 'L'];

  constructor(private api: ApiService) { }

  ngOnInit() {
   this.api.getAlimento().subscribe(
     (alimento: Alimento[]) => this.alimento = alimento,
     (error: any) => this.error = error
   );
 }

 delAlimento(id: number) {
   this.api.deletaAlimento(id).subscribe(
     (success: any) => this.alimento.splice(
       this.alimento.findIndex(item => item.id === id)
     )
   );
 }
 adAlimento(itemNome: any, itemQuantidade: any, itemCategoria: any, itemUnMedida:any, itemEvento:any) {
   this.api.adicionaAlimento(itemNome, itemQuantidade, itemCategoria, itemUnMedida, itemEvento).subscribe(
     (item: Alimento) => this.alimento.push(item)
   );
 }

 editAlimento(id: number, itemNome: any, itemQuantidade: any, itemCategoria: any, itemUnMedida: any, itemEvento: any){
   this.api.editaAlimento(id, itemNome, itemQuantidade, itemCategoria, itemUnMedida, itemEvento).subscribe(
     (success: any) => this.alimento.splice(
       this.alimento.findIndex(item => item.id === id)
     )
   );
 }
 
}
