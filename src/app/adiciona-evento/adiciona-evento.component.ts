import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Evento } from './adiciona-evento.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adiciona-evento',
  templateUrl: './adiciona-evento.component.html',
  styleUrls: ['./adiciona-evento.component.css']
})

export class AdicionaEventoComponent implements OnInit {

  evento: Evento[];
  error: any;

  constructor(
    private api: ApiService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getEvento();
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
  getEvento() {
    this.api.getEvento().subscribe(
      (evento: Evento[]) => this.evento = evento,
      (error: any) => this.error = error
    );
  }

}
