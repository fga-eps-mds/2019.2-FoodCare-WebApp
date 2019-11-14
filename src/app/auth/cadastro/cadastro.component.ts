import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'cadastro-form',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  error: any
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() { }
  cadastrar(username: string, email: string, password1: string, password2: string) {
    this.authService.cadastrar(username, email, password1, password2).subscribe(
      success => {
        alert("Cadastro efetuado com sucesso");
        this.router.navigate(['eventos-doador']),
        console.log('nome')
      },
      error => this.error = error
    );
  }

}
