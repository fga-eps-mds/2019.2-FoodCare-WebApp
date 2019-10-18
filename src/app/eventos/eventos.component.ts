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
  selectedEvento;
  isShow = false;
  
  constructor(private api: ApiService) {
    this.getEventos();
    moment.locale('pt-BR');
    this.selectedEvento = { id: -1, nome: '', desc: '', data_inicio: '', data_final: '' }
  }
  ngOnInit() {

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
  eventoClicked = (evento) => {
    // console.log(movie.id);

    this.api.getOneEvento(evento.id).subscribe(

      data => {
        this.selectedEvento = data;
        this.selectedEvento.data_inicio = this.getDateForEdit(this.selectedEvento.data_inicio);
        this.selectedEvento.data_final = this.getDateForEdit(this.selectedEvento.data_final);
      },
      error => {
        console.log(error);
      }
    )

  }
  updateEvento = () => {
    this.api.updateEvento(this.selectedEvento).subscribe(

      data => {
        this.getEventos();
      },
      error => {
        console.log(error);
      }
    )

  }
  createEvento = () => {
    this.api.createEvento(this.eventos).subscribe(

      data => {
        this.eventos.push(data);
      },
      error => {
        console.log(error);
      }
    )

  }
  deleteEvento = () => {
    this.api.deleteEvento(this.selectedEvento.id).subscribe(

      data => {
        this.getEventos();
      },
      error => {
        console.log(error);
      }
    )

  }
  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  getFormateDate(date) {
    return moment(date).format('LLL');
  }
  getDateForEdit(date){
    return moment(date).format("YYYY-MM-DDTkk:mm");
  }
  mostraDiv(id: string) {
    console.log(id);
    if (document.getElementById(id).style.display == "none") {
      document.getElementById(id).style.display = "block";
    } else {
      /* se conteúdo está a mostra, esconde o conteúdo  */
      document.getElementById(id).style.display = "none";
    }
  }
  refresh() {
    window.location.reload();
  }
  scrollToTop() {
    document.getElementById("inicio").scrollIntoView(true);
  }
}

