import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'Conteudo',
  templateUrl: './conteudo.component.html',
  styleUrls: ['./conteudo.component.css']
})
export class ConteudoComponent implements OnInit {

  private apiRoot = environment.apiURL;

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  onSubmit(data) {
    console.log(data);
    this.sendEmail(data.nome, data.email, data.msg);
  }

  sendEmail(nome: string, email: string, msg: string) {
    return this.http.post(
      this.apiRoot.concat('email/'),
      { nome: nome, email: email, msg: msg }
    ).subscribe(
      success => console.log('Deu bom'),
      error => console.log(error)
    );
  }
}
