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

  evento: Evento[];
  error: any;

  constructor(
    private api: ApiService,
    private router: Router
  ){
    moment.locale('pt-BR');
  }

  ngOnInit() {
    this.api.getEvento().subscribe(
      (evento: Evento[]) => this.evento = evento,
      (error: any) => this.error = error
    );
  }
  delete(id: number) {
    this.api.deleteEvento(id).subscribe(
      (success: any) => this.evento.splice(
        this.evento.findIndex(item => item.id === id)
      )
    );
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
      (evento: Evento[]) => this.evento[id] = evento,
    );
  }


  getFormateDate(date) {
    return moment(date).format('LLL');
  }

  mostraDiv(id: string){
    console.log(id);
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
