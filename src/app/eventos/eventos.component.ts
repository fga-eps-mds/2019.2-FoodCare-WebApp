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

  constructor(private api: ApiService) {
    this.getEventos();
    moment.locale('pt-BR');
    
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

  getDiferencaData( data_final){
    var date1 = Date.now();
    var date2 = new Date(data_final);
    var timeDiff = Math.abs(date2.getTime() - date1);
    var diffDays = Math.ceil(timeDiff / (1000 * 3600  ));
    return diffDays;
  }

  mostraTempoRestante( data_final){
    if (this.getDiferencaData( data_final) >= 168){
      return false;
    } else {
      return true;
    }
  }

  mostraEvento( data_final){
    if (this.getDiferencaData( data_final) == 0){
      return false;
    } else {
      return true;
    }
  }

  getResponsavel(id){
    this.api.getResponsavel(id).subscribe(
      data => {
        console.log(data.user)
        return (data.user).toString();
      }
    )
  }

}