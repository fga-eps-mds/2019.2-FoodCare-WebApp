// import { Component, OnInit } from '@angular/core';
// import { ApiService } from './api.service';
// import { Evento } from './evento.interface';


// @Component({  
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit {
//   title = 'foodcare';
//   items: Evento[];
//   error: any;

//   constructor(private api: ApiService) { }

//   ngOnInit() {
//     this.api.getEvento().subscribe(
//       (items: Evento[]) => this.items = items,
//       (error: any) => this.error = error
//     );
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Evento } from './evento.interface';


@Component({
  selector: 'app-root',
  template: `
  <div style="text-align:center">
    <h1>
      Lista de Eventos
    </h1>
  </div>
  <ul>
    <li *ngFor="let item of items">
    <h2><button (click)="delete(item.id)">x</button></h2>    
      <h2>{{ item.id }} <br> {{ item.id_alimento }} <br> {{ item.data_inicio }} <br> {{ item.data_final }} <br> {{ item.id_alimento}}</h2>
    </li>
  </ul>
  
  <input #itemId_alimento type='number' placeholder='Id_Alimento'>
  <input #itemData_inicial type='datetime-local' placeholder='Data inicial'>
  <input #itemData_final type='datetime-local' placeholder='Data final'>
  <button (click)="add(itemId_alimento.value, itemData_inicial.value, itemData_final.value)">Add</button>
  {{ error?.message }}
  `
})
export class AppComponent implements OnInit {

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
  add(itemId_alimento: object, itemData_inicial: any, itemData_final: any) {
    this.api.createEvento(itemId_alimento, itemData_inicial, itemData_final).subscribe(
      (item: Evento) => this.items.push(item)
    );
  }
}
