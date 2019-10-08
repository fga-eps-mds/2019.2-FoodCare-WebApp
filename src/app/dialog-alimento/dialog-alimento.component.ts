import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Alimento } from './adiciona-evento.interface';
import { Evento } from './adiciona-evento.interface';
import { Categoria } from './adiciona-evento.interface';

@Component({
  selector: 'app-dialog-alimento',
  templateUrl: './dialog-alimento.component.html',
  styleUrls: ['./dialog-alimento.component.css']
})
export class DialogAlimentoComponent implements OnInit {
  evento: Evento;
  alimento: Alimento[];

  constructor(private api: ApiService) { }
  ngOnInit() {
    this.api.getAlimento().subscribe(
      (alimento: Alimento[]) => this.alimento = alimento
      );
      console.log(this.alimento);
  }

}
