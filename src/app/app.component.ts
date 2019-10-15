import { Component , OnInit} from '@angular/core';


import {ApiService} from './exibir-doadores/api.service';
import {Doador} from './exibir-doadores/doadores.interface';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Food Care';
}
