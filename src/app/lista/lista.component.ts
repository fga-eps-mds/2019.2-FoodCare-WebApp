import { Component, OnInit } from '@angular/core';
import {eventos } from '../datamodel/eventos.model';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})
export class ListaComponent implements OnInit {
  eventos: eventos[] = [];
  nome: string;

  constructor( ){}

  ngOnInit() {
    this.eventos = [
      { "ID":1, "nome":"Primeiro", "descricao":"Primeiro evento"},
      { "ID":2, "nome":"Segundo", "descricao":"Segundo evento"},
      { "ID":3, "nome":"Terceiro", "descricao":"Terceiro evento"},
      { "ID":4, "nome":"Quarto", "descricao":"Quarto evento"},
    ];
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

}
