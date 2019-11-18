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
  updateEvento(id, evento): Observable<any> {
    return this.http.put<any>(
      this.apiURL + 'evento/' + id + '/', evento,
      { headers: this.httpHeaders }
    )
  }
  createEvento(evento): Observable<any> {
    return this.http.post<any>(
      this.apiURL + 'evento/', evento,
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
  getCategorias(): Observable<any> {
    return this.http.get<any>(this.apiURL + 'categoria/')
  }
}
