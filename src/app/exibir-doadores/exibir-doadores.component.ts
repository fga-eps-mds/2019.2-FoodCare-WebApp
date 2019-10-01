import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Doador} from './doadores.interface';

@Component({
  selector: 'app-exibir-doadores',
  templateUrl: './exibir-doadores.component.html',
  styleUrls: ['./exibir-doadores.component.css']
})
export class ExibirDoadoresComponent implements OnInit {
  items : Doador[]
  error: any
  constructor(private api:ApiService) { }

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
}
