import { Component } from '@angular/core';
import{FormBuilder} from '@angular/forms';
import {EmailService} from './email.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'Contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent  {
  email;
  form;
  private apiRoot = 'http://localhost:8000/';
  constructor(
    private emailService :EmailService,
    private formBuilder :FormBuilder,
    private http: HttpClient
  ) { 
    this.form  = this.formBuilder.group({
      nome:'',
      email:'',
      msg:''
    });
  }
  onSubmit(data){
    console.log(data);
    this.sendEmail(data.nome,data.email,data.msg);
  }
  sendEmail(nome: string, email: string,msg:string) {
    return this.http.post(
      this.apiRoot.concat('email/'),
      { nome, email,msg }
    ).subscribe(
      success => console.log('Deu bom'),
      error => console.log(error)
    );
  }
}
