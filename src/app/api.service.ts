import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

  private apiRoot = 'http://0.0.0.0:8000/';

  constructor(private http: HttpClient) { }


  getEvento() {
    return this.http.get(this.apiRoot.concat('evento/'));
  }


  createEvento(id_alimento: any, data_inicio: any, data_final: any) {
    const myArray = ['1', '2'];
    id_alimento = JSON.stringify(myArray);
    return this.http.post(
      this.apiRoot.concat('evento/'),
      { id_alimento, data_inicio, data_final }
    );
  }

  deleteEvento(id: number) {
    return this.http.delete(this.apiRoot.concat(`evento/${id}/`));
  }
} //Fim exportclass
