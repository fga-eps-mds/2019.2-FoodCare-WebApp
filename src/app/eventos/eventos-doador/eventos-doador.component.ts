import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';

import { EventoService } from '../evento.service';

@Component({
  selector: 'app-eventos-doador',
  templateUrl: './eventos-doador.component.html',
  styleUrls: ['./eventos-doador.component.css'],
})
export class EventosDoadorComponent implements OnInit {
  doador: any;
  todos_eventos = [];
  eventos = [];
  selectedEvento: any;
  isShow = false;

  constructor(private eventoService: EventoService) {
    moment.locale('pt-BR');
    this.setEventos();
    this.selectedEvento = {
      id: -1,
      nome: '',
      desc: '',
      data_inicio: '',
      data_final: '',
      id_doador: this.doador,
    }
  }

  ngOnInit() { }

  // Funcao para coletar o id do usuario logado
  setUsuario = () => {
    this.eventoService.usuarioLogado().subscribe(
      data => {
        this.doador = data;
        console.log(data);
        this.confereEvento(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  // Funcao para filtrar os eventos criados pelo id_doador
  confereEvento = (data) => {
    for (var e in this.todos_eventos) {
      console.log(data.pk)
      if (this.todos_eventos[e].id_doador == data.pk) {
        this.eventos = data[e];
      }
    }
  }

  // Funcao para coletar todos os eventos criados
  setEventos = () => {
    this.eventoService.getAllEventos().subscribe(
      data => {
        this.todos_eventos = data;
        this.setUsuario();
      },
      error => {
        console.log(error);
      }
    )
  }

  // Funcao que ao ser clicada define o selectedEvento
  eventoClicked = (evento) => {
    this.eventoService.getOneEvento(evento.id).subscribe(
      data => {
        this.selectedEvento = {
          id: data.id,
          nome: data.nome,
          desc: data.desc,
          data_inicio: this.getDateForEdit(data.data_inicio),
          data_final: this.getDateForEdit(data.data_final)
        };
        console.log(this.selectedEvento);
        console.log('teste3');
      },
      error => {
        console.log(error);
      }
    )
  }

  // Funcao para editar evento
  updateEvento = () => {
    this.eventoService.updateEvento(this.selectedEvento).subscribe(
      data => {
        this.setEventos();
      },
      error => {
        console.log(error);
      }
    )
  }

  // Funcao para criar evento
  createEvento = () => {
    this.eventoService.createEvento(this.selectedEvento).subscribe(
      data => {
        this.eventos.push(data);
        this.toggleDisplay();
      },
      error => {
        console.log(error);
      }
    )
  }

  // Funcao para deletar evento
  deleteEvento = () => {
    this.eventoService.deleteEvento(this.selectedEvento.id).subscribe(
      data => {
        this.setEventos();
      },
      error => {
        console.log(error);
      }
    )
  }

  // Funcao para definir visibilidade
  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  // Funcao para formatar a data apresentada
  getFormatedDate(date) {
    return moment(date).format('LLL');
  }

  // Funcao para retornar data do evento
  getDateForEdit(date) {
    return moment(date).format("YYYY-MM-DDTkk:mm");
  }

  // Funcao para decidir a visibilidade de uma div
  mostraDiv(id: string) {
    console.log(id);
    if (document.getElementById(id).style.display == "none") {
      document.getElementById(id).style.display = "block";
    } else {
      /* se conteúdo está a mostra, esconde o conteúdo  */
      document.getElementById(id).style.display = "none";
    }
  }

  // Funcao para dar refresh na pagina
  refresh() {
    window.location.reload();
  }

  // Funcao para rolar ate o topo
  scrollToTop() {
    document.getElementById("inicio").scrollIntoView(true);
  }
}

