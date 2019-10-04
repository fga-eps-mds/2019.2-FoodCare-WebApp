import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Alimento } from './adiciona-alimento.interface';

@Component({
  selector: 'app-adiciona-alimento',
  templateUrl: './adiciona-alimento.component.html',
  styleUrls: ['./adiciona-alimento.component.css']
})

export class AdicionaAlimentoComponent implements OnInit {

  items: Alimento[];
  error: any;

  constructor(private api: ApiService) { }

  ngOnInit() {
   this.api.getAlimento().subscribe(
     (items: Alimento[]) => this.items = items,
     (error: any) => this.error = error
   );
 }

 delAlimento(id: number) {
   this.api.deletaAlimento(id).subscribe(
     (success: any) => this.items.splice(
       this.items.findIndex(item => item.id === id)
     )
   );
 }
 adAlimento(itemNome: any, itemQuantidade: any, itemCategoria: any, itemUnMedida:any, itemEvento:any) {
   this.api.adicionaAlimento(itemNome, itemQuantidade, itemCategoria, itemUnMedida, itemEvento).subscribe(
     (item: Alimento) => this.items.push(item)
   );
 }

 editAlimento(id: number, itemNome: any, itemQuantidade: any, itemCategoria: any, itemUnMedida: any, itemEvento: any){
   this.api.editaAlimento(id, itemNome, itemQuantidade, itemCategoria, itemUnMedida, itemEvento).subscribe(
     (success: any) => this.items.splice(
       this.items.findIndex(item => item.id === id)
     )
   );
 }

 radioChangeHandler (event: any){
   this.itemUnMedida = event.target.value;
 }

}
