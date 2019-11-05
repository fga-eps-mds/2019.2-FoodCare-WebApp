import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})
export class ListaComponent implements OnInit {
  eventos = [];
  key: string = 'data_final';
  nome: string;

  constructor( private api: ApiService ){
    this.getEventos();
  }

  ngOnInit() {
    this.eventos = [];
  }

// Função atribuída à caixa de busca (input)
  Search(){
    if(this.nome != ""){
      this.eventos = this.eventos.filter(res=>{
        return res.nome.toLocaleLowerCase().match(this.nome.toLocaleLowerCase());
      })
    }
    else if(this.nome == ""){ this.ngOnInit();}
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

