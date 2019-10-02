import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Evento } from './evento.interface';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  items: Evento[];
  error: any;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getEvento().subscribe(
      (items: Evento[]) => this.items = items,
      (error: any) => this.error = error
    );
  }
  delete(id: number) {
    this.api.deleteEvento(id).subscribe(
      (success: any) => this.items.splice(
        this.items.findIndex(item => item.id === id)
      )
    );
  }
  add(itemData_inicial: any, itemData_final: any, itemLocal: any) {
    this.api.createEvento(itemData_inicial, itemData_final, itemLocal).subscribe(
      (item: Evento) => this.items.push(item)
    );
  }

  edit(id: number, itemData_inicial: any, itemData_final: any, itemLocal: any){
    this.api.editEvento(id, itemData_inicial, itemData_final, itemLocal).subscribe(
      (item: Evento) => this.items.forEach(item => item)

    );

  }
}
