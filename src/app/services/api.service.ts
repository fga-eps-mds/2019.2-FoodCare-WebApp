import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

  private apiRoot = 'http://0.0.0.0:8000/';

  constructor(private http: HttpClient) { }


  getEvento() {
    return this.http.get(this.apiRoot.concat('evento/'));
  }


  createEvento(data_inicio: any, data_final: any, local: any) {
    //const alimentos = [];
    //alimentos.push(id_alimento);
    //id_alimento = alimentos;
    return this.http.post(
      this.apiRoot.concat('evento/'),
      { data_inicio, data_final, local }
    );
  }

  deleteEvento(id: number) {
    return this.http.delete(this.apiRoot.concat(`evento/${id}/`));
  }
} //Fim exportclass
