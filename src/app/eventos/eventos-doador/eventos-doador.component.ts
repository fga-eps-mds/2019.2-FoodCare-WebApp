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
  doador: any = '';
  eventos = [];
  categorias = [];
  selectedEvento: any;
  isShow = false;

  constructor(private eventoService: EventoService) {
    moment.locale('pt-BR');
    this.setEventos();
    this.setCategoria();

    this.selectedEvento = {
      id: -1,
      nome: '',
      desc: '',
      data_inicio: '',
      data_final: '',
      id_doador: 1,
      local: '',
      id_categoria: -1
    }
  }

  ngOnInit() {
    this.setUsuario();
    console.log(this.doador);
  }

  // Funcao para coletar o id do usuario logado
  setUsuario = () => {
    this.eventoService.usuarioLogado().subscribe(
      data => {
        this.doador = data;
        console.log(data.pk);
      },
      error => {
        console.log(error);
      }
    )
  }

  // Funcao para coletar todos as categorias criados
  setCategoria = () => {
    this.eventoService.getCategoria().subscribe(
      data => {
        this.categorias = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  // Funcao para coletar todos os eventos criados
  setEventos = () => {
    this.eventoService.getAllEventos().subscribe(
      data => {
        this.eventos = data;
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
          data_final: this.getDateForEdit(data.data_final),
          local: data.local,
          id_doador: this.doador,
          id_categoria: data.id_categoria
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

