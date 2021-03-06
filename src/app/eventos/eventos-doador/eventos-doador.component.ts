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

    eventosFilter: any = {nome: ''};
    eventosOrder: string = 'data_final';
    categoriaFilter: any = { id_categoria: null };

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
        this.registerForm = this.formBuilder.group({
            nome: ['', Validators.required],
            categoria: ['', Validators.required],
            data_inicio: ['', Validators.required],
            data_final: ['', Validators.required],
            desc: ['', Validators.required],
        });

    }

    onSubmit(data, mode) {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        } else {
            data.data_final = this.getDateForEdit(data.data_final)
            data.data_inicio = this.getDateForEdit(data.data_inicio)
            if (mode == 'create') {
                this.createEvento(data);
            } else if (mode == 'update') {
                this.updateEvento(data);
            }
            this.closeDialog();
        }
    }
    get f() { return this.registerForm.controls; }

    // Funcao para coletar o id do usuario logado
    getUsuario = () => {
        return this.authService.usuarioLogado()
            .subscribe(
                data => {
                    this.doador = data;
                    this.eventosFilter = { id_doador: data.pk }
                }
            )
    }
    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }
    openDialog = (templateRef: TemplateRef<any>) => {
        this.dialog.open(templateRef);
    }


    closeDialog = () => {
        this.dialog.closeAll();
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
    refresh(): void {
        window.location.reload();
    }

    // Funcao que ao ser clicada define o selectedEvento
    eventoSelecionado = (evento) => {
        this.selectedEvento = evento;
        this.selectedEvento.data_inicio = this.getDateForEdit(this.selectedEvento.data_inicio);
        this.selectedEvento.data_final = this.getDateForEdit(this.selectedEvento.data_final);
    }

    // Funcao para criar evento
    createEvento = (data) => {
        this.evento = {
            nome: data.nome,
            desc: data.desc,
            latitude: Number(localStorage.getItem("lt")),
            longitude: Number(localStorage.getItem("lg")),
            data_inicio: data.data_inicio,
            data_final: data.data_final,
            id_doador: this.doador.pk,
            id_categoria: data.categoria
        }
        this.eventoService.createEvento(this.evento)
            .subscribe(
                data => {
                    // this.toggleDisplay();
                    this.getEventos();
                }
            )
    }

    // Funcao para editar evento
    updateEvento = (data) => {
        let evento = {
            nome: data.nome,
            desc: data.desc,
            latitude: this.selectedEvento.latitude,
            longitude: this.selectedEvento.longitude,
            data_inicio: data.data_inicio,
            data_final: data.data_final,
            id_doador: this.selectedEvento.id_doador,
            id_categoria: data.categoria
        }
        this.eventoService.updateEvento(this.selectedEvento.id, evento)
            .subscribe(
                data => this.getEventos(),
                error => {
                    this.getEventos();
                }
            )
    }

    // Funcao para deletar evento
    deleteEvento = () => {
        this.eventoService.deleteEvento(this.selectedEvento.id).subscribe(
            success => {
                alert("Evento excluído com sucesso");
                this.getEventos()
            },
            error => this.error = error
        );
    }

    getCategorias = () => {
        this.eventoService.getCategorias()
            .subscribe(
                data => {
                    this.categorias = data;
                }
            )
    }

    // Funcao para formatar a data apresentada
    getFormatedDate(date) {
        return moment(date).format('LLL');
    }

    // Funcao para retornar data do evento
    getDateForEdit(date) {
        return moment(date).format("YYYY-MM-DDThh:mm");
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
