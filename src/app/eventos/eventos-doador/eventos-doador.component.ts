import { Component, OnInit, HostListener } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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
  error: any;
  registerForm: FormGroup;
  submitted = false;

  eventosFilter: any = {id_doador: null};

  isShow = false;
  innerWidth: any = window.innerWidth;

  constructor(
    private eventoService: EventoService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) {
    moment.locale('pt-BR');
    this.getUsuario();
    this.getEventos();
    this.getCategorias();
    this.getLocalizacao();
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
    var date = new Date();
    this.registerForm = this.formBuilder.group({
      nome: ['', Validators.required],
      categoria: ['', Validators.required],
      data_inicio: ['', Validators.required],
      data_final: ['', Validators.required],
      desc: ['',Validators.required],
    });
  }

  onSubmit(data) {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    console.log(data);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
  get f() { return this.registerForm.controls; }

  // Funcao para coletar o id do usuario logado
  getUsuario = () => {
    return this.authService.usuarioLogado()
    .subscribe(
      data => {
        this.doador = data;
        console.log(data);
        this.eventosFilter = {id_doador: data.pk}
        console.log('doador', this.doador);
      },
      error => {
        console.log(error);
      }
    )
  }
  openDialog = (templateRef: TemplateRef<any>) => {
      this.dialog.open(templateRef);
  }
  logout() {
    this.authService.logout();
  }

  // Funcao para coletar todos os eventos criados
  getEventos = () => {
    this.eventoService.getAllEventos()
    .subscribe(
      data => {
        this.eventos = data;
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
        this.getEventos();
      }
    )
  }

  // Funcao para criar evento
  createEvento = () => {
    this.evento.id_doador = this.doador.pk;
    this.evento.latitude = Number(localStorage.getItem("lt"));
    this.evento.longitude = Number(localStorage.getItem("lg"));
    this.eventoService.createEvento(this.evento)
    .subscribe(
      data => {
        this.toggleDisplay();
        this.getEventos();
      }
    )
  }

  // Funcao para deletar evento
  deleteEvento = () => {
    this.eventoService.deleteEvento(this.selectedEvento.id).subscribe(
      data => this.getEventos()
    )
  }

  getCategorias = () => {
    this.eventoService.getCategorias()
    .subscribe(
      data => {
        this.categorias = data;
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
    navigator.geolocation.getCurrentPosition(success);
    function success(position: any) {
      localStorage.setItem("lt", position.coords.latitude)
      localStorage.setItem("lg", position.coords.longitude)
    }
  }
}
