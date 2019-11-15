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

  categorias: any = [];

  eventosFilter: any = {nome: ''};
  eventosOrder: string = 'data_final';

  constructor(private eventoService: EventoService) {
    moment.locale('pt-BR');
    this.getEventos();
    this.getCategoria();
    this.getLocalizacao();
  }

  ngOnInit() { }

  // Funcao para coletar todos as categorias criados
  getCategoria = () => {
    this.eventoService.getCategorias().subscribe(
      data => {
        this.categorias = data;
      },
      error => {
        console.log(error);
      }
    )
  }

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

  getLocalizacao() {
    navigator.geolocation.getCurrentPosition(success, error);
    function success(position: any) {

      alert('Localização ativada!')
      localStorage.setItem("lt", position.coords.latitude)
      localStorage.setItem("lg", position.coords.longitude)

    }
    function error() {
      alert('Localização não autorizada')
    }
    console.log("ATUAL: " + localStorage.getItem("lt") + "Longitude: " + localStorage.getItem("lg"));
    // console.log("GLOBAL: ", this.lat + " Longitude: ", this.lng);
  }

  distanciaEvento(lat1: number, lon1: number, lat2: number, lon2: number) {
    var R = 6378.137;
    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d.toFixed(2);  //km com duas casas decimais
  }

  getLatitude(){
    return localStorage.getItem("lt");
  }
  getLongitude(){
    return localStorage.getItem("lg");
  }
}
