import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'Conteudo',
  templateUrl: './conteudo.component.html',
  styleUrls: ['./conteudo.component.css']
})
export class ConteudoComponent implements OnInit {

  private apiRoot = 'http://localhost:8000/';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private http: HttpClient
  ) { }

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
