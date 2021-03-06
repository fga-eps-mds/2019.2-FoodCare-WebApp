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
    this.getCategorias();
    this.setLocalizacao();
  }

  ngOnInit() { }

  // Funcao para coletar todos as categorias criados
  getCategorias = () => {
    this.eventoService.getCategorias().subscribe(
      data => {
        this.categorias = data;
      }
    )
  }

  getEventos = () => {
    this.eventoService.getAllEventos()
    .subscribe(
      data => {
        this.eventos = data;
      }
    )
  }

  getFormatedDate(date) {
    return moment(date).calendar();
  }

  setLocalizacao() {
    navigator.geolocation.getCurrentPosition(success);
    function success(position: any) {
      localStorage.setItem("lt", position.coords.latitude)
      localStorage.setItem("lg", position.coords.longitude)
    }
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

  geraLocalMaps(latitude: Number, longitude: Number) {
    this.eventoService.abreMaps(latitude, longitude);
  }

  getLatitude(){
    let latitudeAtual = localStorage.getItem("lt");
    return Number(latitudeAtual);
  }
  getLongitude(){
    let longitudeAtual = localStorage.getItem("lg");
    return Number(longitudeAtual);
  }
}
