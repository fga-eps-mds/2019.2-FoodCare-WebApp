import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doador} from './doadores.interface';
import { DoadorService } from './doador.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-exibir-doadores',
  templateUrl: './exibir-doadores.component.html',
  styleUrls: ['./exibir-doadores.component.css']
})
export class ExibirDoadoresComponent implements OnInit {
  items : Doador[]
  error: any
  constructor(
    private api: DoadorService, 
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.api.getDoadores().subscribe(
      (items: Doador[])=> this.items =items,
      (error:any) => this.error = error
    );
  }
  delete(id:number){
    this.api.deleteDoador(id).subscribe(
      (sucess:any) => this.items.splice(
        this.items.findIndex(item => item.id === id)
      )
    );
  }
  add(nome: string, cnpj: string, email: string, password: string) {
    this.api.createDoador(nome, cnpj,email,password).subscribe(
      (item:Doador)=>this.items.push(item)    );
  }
  logout(){
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
