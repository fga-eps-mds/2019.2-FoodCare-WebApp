import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
// import { Evento } from './evento.interface';
import * as moment from 'moment';
import 'moment/locale/pt-br';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
  providers: [ApiService],
})

export class EventosComponent implements OnInit {
  eventos = [];
  selectedEvento: any;
  isShow = false;

  constructor(private api: ApiService) {
    this.getEventos();
    moment.locale('pt-BR');
    this.selectedEvento = {
      id: -1,
      nome: '',
      desc: '',
      data_inicio: '',
      data_final: ''
    }
  }

  ngOnInit() { }

  getEventos = () => {
    this.api.getAllEventos().subscribe(
      data => {
        this.eventos = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  getFormateDate(date) {
    return moment(date).format('LLL');
  }

}

