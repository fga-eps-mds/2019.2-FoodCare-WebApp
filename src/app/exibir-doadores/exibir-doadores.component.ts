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

}
