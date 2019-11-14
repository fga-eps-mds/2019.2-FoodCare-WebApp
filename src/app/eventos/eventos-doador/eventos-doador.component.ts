import { Component, OnInit, HostListener } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';

import { EventoService } from '../evento.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-eventos-doador',
  templateUrl: './eventos-doador.component.html',
  styleUrls: ['./eventos-doador.component.css'],
})
export class EventosDoadorComponent implements OnInit {
  doador: any;
  evento: any;
  eventos: any;
  categorias: any;
  selectedEvento: any;

  isShow = false;
  innerWidth: any = window.innerWidth;
  latitude: any;
  longitude: any;

  constructor(
    private eventoService: EventoService,
    private authService: AuthService,
  ) {
    moment.locale('pt-BR');
    this.getEventos();
    this.getCategorias();
    this.evento = {
      nome: "",
      desc: "",
      latitude: null,
      longitude: null,
      data_inicio: null,
      data_final: null,
      id_doador: null,
      id_categoria: null
    }
    this.selectedEvento = {
      nome: "",
      desc: "",
      latitude: null,
      longitude: null,
      data_inicio: null,
      data_final: null,
      id_doador: null,
      id_categoria: null
    }
  }

  ngOnInit() {
    this.setUsuario();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  // Funcao para coletar o id do usuario logado
  setUsuario = () => {
    return this.authService.usuarioLogado()
    .subscribe(
      data => {
        this.doador = data;
        console.log(data);
        console.log('doador', this.doador);
        this.confereEvento(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  // Funcao para coletar todos os eventos criados
  getEventos = () => {
    this.eventoService.getAllEventos()
    .subscribe(
      data => {
        console.log(data);
        this.eventos = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  // Funcao que ao ser clicada define o selectedEvento
  eventoSelecionado = (evento) => {
    this.selectedEvento = evento;
    this.selectedEvento.data_inicio = this.getDateForEdit(this.selectedEvento.data_inicio);
    this.selectedEvento.data_final = this.getDateForEdit(this.selectedEvento.data_final);
  }

  // Funcao para editar evento
  updateEvento = () => {
    this.eventoService.updateEvento(this.selectedEvento.id, this.selectedEvento)
    .subscribe(
      data => this.getEventos(),
      error => {
        console.log(error);
      }
    )
  }

  // Funcao para criar evento
  createEvento = () => {
    this.getLocalizacao();
    this.evento.id_doador = this.doador.pk;
    this.selectedEvento.latitude = this.latitude,
    this.selectedEvento.longitude = this.longitude,
    this.eventoService.createEvento(this.evento)
    .subscribe(
      data => {
        this.toggleDisplay();
        this.getEventos();
      },
      error => {
        console.log(error);
      }
    )
  }

  // Funcao para deletar evento
  deleteEvento = () => {
    this.eventoService.deleteEvento(this.selectedEvento.id).subscribe(
      data => this.getEventos(),
      error => {
        console.log(error);
      }
    )
  }

  getCategorias = () => {
    this.eventoService.getCategorias()
    .subscribe(
      data => {
        this.categorias = data;
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
    return moment(date).format("YYYY-MM-DDThh:mm");
  }

  // Funcao para decidir a visibilidade de uma div
  mostraDiv(id: string) {
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

  // Função para pegar a localização atual
  getLocalizacao() {
    var latitude: any;
    var longitude: any;
    navigator.geolocation.getCurrentPosition(success);

    function success(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      alert('Localização ativada!')

      // mostrar coordenadas dentro do alerta
      alert('Latitude: ' + latitude + 'Longitude: ' + longitude);

      // "Salvar" no console os dados obtidos
      console.log("Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude);
    }

    this.latitude = latitude;
    this.longitude = longitude;
  }
}
