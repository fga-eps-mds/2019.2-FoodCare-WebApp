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
  latitude: any;
  longitude: any;

  constructor(private eventoService: EventoService) {
    moment.locale('pt-BR');
    this.getEventos();
    this.getCategoria();
    this.getLocalizacao();
    this.calculaDistancia(this.latitude, this.longitude);
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
    var latitude: any;
    var longitude: any;
    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      alert('Localização ativada!')

      // mostrar coordenadas dentro do alerta
      alert('Latitude: ' + latitude + 'Longitude: ' + longitude);

      // "Salvar" no console os dados obtidos
      console.log("Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude);
    }
    function error(){
      alert('Localização não autorizada')
    }
    this.latitude = latitude;
    this.longitude = longitude;
  }

  calculaDistancia(latitude: any, longitude: any){
    var dist  = ( latitude - this.latitude)**2 + (longitude - this.longitude)**2
    return Math.sqrt(dist)
  }
}
