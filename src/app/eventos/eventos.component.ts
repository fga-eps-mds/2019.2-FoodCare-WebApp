import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';

import { EventoService } from './evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
})

export class EventosComponent implements OnInit {
  eventos: any = [];
  
  eventosFilter: any = { nome: '' };
  eventosOrder: string = 'data_final';

  constructor(private eventoService: EventoService) {
    moment.locale('pt-BR');
    this.getEventos();
  }

  ngOnInit() { }


  getEventos = () => {
    this.eventoService.getAllEventos().subscribe(
      data => {
        this.eventos = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  getFormatedDate(date) {
    return moment(date).format('LLL');
  }

  getDiferencaData(data_final) {
    var date1 = Date.now();
    var date2 = new Date(data_final);
    var timeDiff = Math.abs(date2.getTime() - date1);
    var diffDays = Math.ceil(timeDiff / (1000 * 3600));
    return diffDays;
  }

  mostraTempoRestante(data_final) {
    if (this.getDiferencaData(data_final) >= 168) {
      return false;
    } else {
      return true;
    }
  }

  mostraEvento(data_final) {
    if (this.getDiferencaData(data_final) == 0) {
      return false;
    } else {
      return true;
    }
  }
}
