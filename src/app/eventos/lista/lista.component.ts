import { Component, OnInit } from '@angular/core';

import { EventoService } from '../evento.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})
export class ListaComponent implements OnInit {
  eventos = [];
  key: string = 'data_final';
  eventoFilter: any = { nome: '' };

  constructor(private api: EventoService) {
    this.getEventos();
  }

  ngOnInit() {
    this.eventos = [];
  }

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
}

