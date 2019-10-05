import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Alimento } from './adiciona-evento.interface';
import { Categoria } from './adiciona-evento.interface';
import { Evento } from './adiciona-evento.interface';

@Component({
  selector: 'app-adiciona-evento',
  templateUrl: './adiciona-evento.component.html',
  styleUrls: ['./adiciona-evento.component.css']
})

export class AdicionaEventoComponent implements OnInit {

  evento: Evento[];
  alimento: Alimento[];
  id_evento: number;
  categoria: Categoria[];
  id_categoria: number;
  error: any;
  un_medida: string = '';
  UnMedida: any=['Unidade', 'Kg', 'l'];

  constructor(private api: ApiService) { }

  ngOnInit() {
   this.api.getAlimento().subscribe(
     (alimento: Alimento[]) => this.alimento = alimento,
     (error: any) => this.error = error
   );
   this.api.getCategoria().subscribe(
     (categoria: Categoria[]) => this.categoria = categoria,
     (error: any) => this.error = error
   );
   this.api.getEvento().subscribe(
     (evento: Evento[]) => this.evento = evento,
     (error: any) => this.error = error
   );
 }

 adAlimento(itemNome: any, itemQuantidade: any) {
   this.evento.push(this.evento[this.evento.length - 1].id);
   this.api.adicionaAlimento( this.evento[this.evento.length - 1].id, this.id_categoria, itemNome, this.un_medida, itemQuantidade ).subscribe(
     (alimento: Alimento) => this.alimento.push(alimento)
   );
 }

 editAlimento(id: number, itemNome: any, itemQuantidade: any){
   this.api.editaAlimento(id, this.evento[this.evento.length - 1].id, this.id_categoria, itemNome, this.un_medida, itemQuantidade ).subscribe(
     (success: any) => this.alimento.splice(
       this.alimento.findIndex(alimento => alimento.id === id)
     )
   );
 }
 delAlimento(id: number) {
   this.api.deletaAlimento(id).subscribe(
     (success: any) => this.alimento.splice(
       this.alimento.findIndex(alimento => alimento.id === id)
     )
   );
 }
 adEvento(itemData_inicial: any, itemData_final: any, itemLocal: any) {
   this.api.createEvento(itemData_inicial, itemData_final, itemLocal).subscribe(
     (evento: Evento) => this.evento.push(evento)
   );
 }
}
