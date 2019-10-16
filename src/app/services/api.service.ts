import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

  private apiRoot = 'http://0.0.0.0:8000/';

  constructor(private http: HttpClient) { }


  getEvento() {
    return this.http.get(this.apiRoot.concat('evento/'));
  }


  createEvento(nome: string, data_inicio: any, data_final: any, desc: string) {
    //const alimentos = [];
    //alimentos.push(id_alimento);
    //id_alimento = alimentos;
    return this.http.post(
      this.apiRoot.concat('evento/'),
      { nome, data_inicio, data_final, desc }
    );
  }

  deleteEvento(id: number) {
    return this.http.delete(this.apiRoot.concat(`evento/${id}/`));
  }

  editEvento(id: number, nome: string, data_inicio: any, data_final: any, desc: any){
    return this.http.put(
      this.apiRoot.concat(`evento/${id}/`),
      {id, nome, data_inicio, data_final, desc }
    );
  }


} //Fim exportclass
