import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Alimento } from './adiciona-evento.interface';
import { Evento } from './adiciona-evento.interface';
import { Categoria } from './adiciona-evento.interface';

@Component({
  selector: 'app-adiciona-evento',
  templateUrl: './adiciona-evento.component.html',
  styleUrls: ['./adiciona-evento.component.css']
})

export class AdicionaEventoComponent implements OnInit {

  evento: Evento[];
  id_evento: number;
  alimento: Alimento[];
  alimentoEvento: Alimento[];
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
   this.alimentoEvento=[];
 }
 // Adciona um novo evento
 adEvento(itemData_inicial: any, itemData_final: any, itemLocal: any) {
   this.api.createEvento(itemData_inicial, itemData_final, itemLocal).subscribe(
     (evento: Evento) => this.evento.push(evento)
   );
   this.id_evento = this.evento[this.evento.length - 1].id;
 }
 // adiciona um novo alimento
 adAlimento(itemNome: string, itemQuantidade: number) {
   this.api.adicionaAlimento( this.id_evento, this.id_categoria, itemNome, this.un_medida, itemQuantidade ).subscribe(
     (alimento: Alimento) => this.alimento.push(alimento)
   );
   this.api.adicionaAlimento( this.id_evento, this.id_categoria, itemNome, this.un_medida, itemQuantidade ).subscribe(
     (alimento: Alimento) => this.alimentoEvento.push(alimento)
     );
 }

 editAlimento(id: number, itemNome: any, itemQuantidade: any){
   this.api.editaAlimento(id, this.id_evento, this.id_categoria, itemNome, this.un_medida, itemQuantidade ).subscribe(
     (alimento: Alimento) => this.alimento[id] = alimento,
   );
   this.api.editaAlimento(id, this.id_evento, this.id_categoria, itemNome, this.un_medida, itemQuantidade ).subscribe(
     (alimento: Alimento) => this.alimentoEvento[id] = alimento,
   );
 }
 delAlimento(id: number) {
   this.api.deletaAlimento(id).subscribe(
     (success: any) => this.alimento.splice(
       this.alimento.findIndex(alimento => alimento.id === id)
     )
   );

    this.alimentoEvento.splice( this.alimentoEvento.findIndex(Alimento => Alimento.id === id));
 }
 mostraEditaAlimento(id: any){
   if (document.getElementById(id).style.display == "none") {
      document.getElementById(id).style.display = "block";
    } else {
      /* se conteúdo está a mostra, esconde o conteúdo  */
      document.getElementById(id).style.display = "none";
    }
 }

}
