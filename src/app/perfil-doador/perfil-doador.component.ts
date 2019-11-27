import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Doador } from '../auth/doador';

@Component({
  selector: 'app-perfil-doador',
  templateUrl: './perfil-doador.component.html',
  styleUrls: ['./perfil-doador.component.css']
})
export class PerfilDoadorComponent implements OnInit {

  IsShow: boolean = false;
  IsShow1: boolean = false;
  doador: Doador;
  senha1: String = '';
  senha2: String = '';

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.getUsuario();
  }

  ngOnInit() {

  }

  getUsuario = () => {
    return this.authService.usuarioLogado()
    .subscribe(
      data=> {
        this.doador = data;
      }
    );
  }

  mostraDiv = () => {
    if (this.IsShow == false) {
      this.IsShow = true;
    }
    else {
      this.IsShow = false;
    }

  }

  mostraDiv1 = () => {
    if (this.IsShow1 == false) {
      this.IsShow1 = true;
    }
    else {
      this.IsShow1 = false;
    }
  }

  atualiza = () => {
    this.authService.atualizaDoador(this.doador)
    .subscribe(
      response => {
        alert("Logue com seu novo usuário"),
        this.router.navigate(['login'])
      }
    );
  }

  deleta = () => {
    this.authService.deleteUser(this.doador)
    .subscribe(
      response => {
        alert("Usuário deletado!"),
        this.router.navigate([''])
      }
    );
  }

  atualizaSenha = () => {
    this.authService.atualizaSenhaDoador(this.senha1, this.senha2)
    .subscribe(
      response => {
        alert("Logue com sua nova senha"),
        this.router.navigate(['login'])
      }
    );
  }
}
