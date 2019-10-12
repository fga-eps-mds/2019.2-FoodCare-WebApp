import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Evento } from './evento.interface';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  items: Evento[];
  error: any;

  constructor(
    private api: ApiService,
    private router: Router
  ){
    moment.locale('pt-BR');
  }

  ngOnInit() {
    this.api.getEvento().subscribe(
      (items: Evento[]) => this.items = items,
      (error: any) => this.error = error
    );
  }
  delete(id: number) {
    this.api.deleteEvento(id).subscribe(
      (success: any) => this.items.splice(
        this.items.findIndex(item => item.id === id)
      )
    );
  }

  // edit(id:number){
  //   this.api.
  // }

  getFormateDate(date) {
    return moment(date).format('LLL');
  }

  mostraSalvaAlimento(){
    if (document.getElementById("save-info").style.display == "none") {
       document.getElementById("save-info").style.display = "block";
     } else {
       /* se conteúdo está a mostra, esconde o conteúdo  */
       document.getElementById("save-info").style.display = "none";
     }
  }

  // Adciona um novo evento
  adEvento(nome: string, data_inicial: any, data_final: any, desc: string) {
    this.api.createEvento(nome, data_inicial, data_final, desc).subscribe(
      success => {
        (evento: Evento) => this.evento.push(evento);
        this.router.navigate(['eventos'])
      },
      error => {
        this.error = error;
        console.log(error)
      }
    );
  }

  // Adciona um novo evento
  editEvento(id: number, nome: string, data_inicial: any, data_final: any, desc: string) {
    this.api.editEvento(id, nome, data_inicial, data_final, desc).subscribe(
      (items: Evento[]) => this.items[id] = items,
    );
  }

  mostraEditaAlimento(id: any){
    if (document.getElementById(id).style.display == "none") {
       document.getElementById(id).style.display = "block";
     } else {
       /* se conteúdo está a mostra, esconde o conteúdo  */
       document.getElementById(id).style.display = "none";
     }
  }

  refresh(){
      window.location.reload();
  }
}
