import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private apiURL = environment.apiURL;
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getAllEventos(): Observable<any> {
    return this.http.get(
      this.apiURL + 'evento/',
      { headers: this.httpHeaders }
    )
  }
  getOneEvento(id): Observable<any> {
    return this.http.get(
      this.apiURL + 'evento/' + id + '/',
      { headers: this.httpHeaders }
    )
  }
  updateEvento(evento): Observable<any> {
    const body = { nome: evento.nome, desc: evento.desc, data_inicio: evento.data_inicio, data_final: evento.data_final };
    return this.http.put(
      this.apiURL + 'evento/' + evento.id + '/', body,
      { headers: this.httpHeaders }
    )
  }
  createEvento(evento): Observable<any> {
    const body = { nome: evento.nome, desc: evento.desc, id_doador: evento.id_doador, data_inicio: evento.data_inicio, data_final: evento.data_final };
    return this.http.post(
      this.apiURL + 'evento/', body,
      { headers: this.httpHeaders }
    )
  }
  deleteEvento(id): Observable<any> {
    return this.http.delete(
      this.apiURL + 'evento/' + id + '/',
      { headers: this.httpHeaders }
    )
  }
  usuarioLogado(): Observable<any> {
    return this.http.get(
      this.apiURL + 'auth/user/',
      { headers: this.httpHeaders }
    )
  }
  getResponsavel(id): Observable<any> {
    return this.http.get(
      this.apiURL + 'user/' + id + '/',
      { headers: this.httpHeaders }
    )
  }
  getCategoria(): Observable<any> {
    return this.http.get(
      this.apiURL + 'categoria/',
      { headers: this.httpHeaders }
    )
  }
}
