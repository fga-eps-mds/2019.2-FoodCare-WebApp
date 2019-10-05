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

  adicionaAlimento( id_evento:number, id_categoria:number, nome:string, un_medida:number, quantidade:number) {
    const categoria = [];
    categoria.push(id_categoria);
    id_categoria = categoria;
    return this.http.post(
      this.apiRoot.concat('alimento/'),
      { nome,  un_medida, quantidade, id_evento, id_categoria}
    );
  }

  deletaAlimento(id: number) {
    return this.http.delete(this.apiRoot.concat(`alimento/${id}/`));
  }

  editaAlimento(id:any, id_evento:any, id_categoria:any, nome:any, un_medida:any, quantidade:any){
    return this.http.put(
      this.apiRoot.concat(`alimento/${id}/`),
      { id_evento, id_categoria, nome, un_medida, quantidade}
    );
  }

  getCategoria() {
    return this.http.get(this.apiRoot.concat('categoria/'));
  }

} //Fim exportclass
