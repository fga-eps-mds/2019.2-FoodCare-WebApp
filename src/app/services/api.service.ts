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

  editEvento(id: number, data_inicio: any, data_final: any, local: any){
    return this.http.put(
      this.apiRoot.concat(`evento/${id}/`),
      { data_inicio, data_final, local }
    );
  }
  getAlimento() {
    return this.http.get(this.apiRoot.concat('alimento/'));
  }

  adicionaAlimento(nome: any, quantidade: any, id_categoria: any, un_medida:any, id_evento: any) {
    return this.http.post(
      this.apiRoot.concat('alimento/'),
      { nome, quantidade, id_categoria, un_medida, id_evento }
    );
  }

  deletaAlimento(id: number) {
    return this.http.delete(this.apiRoot.concat(`alimento/${id}/`));
  }

  editaAlimento(id: number, nome: any, quantidade: any, id_categoria: any, un_medida:any, id_evento: any){
    return this.http.put(
      this.apiRoot.concat(`alimento/${id}/`),
      { nome, quantidade, id_categoria, un_medida, id_evento}
    );
  }


  getCategoria() {
    return this.http.get(this.apiRoot.concat('categoria/'));
  }

} //Fim exportclass
