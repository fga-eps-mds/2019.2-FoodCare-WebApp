import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-perfil-doador',
  templateUrl: './perfil-doador.component.html',
  styleUrls: ['./perfil-doador.component.css']
})
export class PerfilDoadorComponent implements OnInit {

  IsShow: boolean = false;
  nome_doador: any;
  
  constructor(
    private router: Router,
    private authService: AuthService,
    
  ) { }

  ngOnInit() {
    
  }


  mostraDiv = () => {
    if (this.IsShow == false) {
      this.IsShow = true;

    }
    else {
      this.IsShow = false;

    }
  }
  atualiza = () => {
    this.router.navigate(['eventos-doador'])
  }
}
