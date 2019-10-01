import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'cadastro-form',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  error:any
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {}
  cadastrar(username:string, nome:string, cnpj:string, email:string, password1: string,password2: string){
    alert("Chegou cadastrar()");
    this.authService.cadastrar(username, nome, cnpj, email, password1,password2).subscribe(
      success => this.router.navigate(['exibir-doadores']),
      error => this.error = error
    );
  }

}
