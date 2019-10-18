import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = "http://0.0.0.0:8000"
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getAllEventos(): Observable<any>{
    return this.http.get(this.baseurl + '/evento/' ,
     {headers: this.httpHeaders} )
  }
  getOneEvento(id): Observable<any>{
    return this.http.get(this.baseurl + '/evento/' + id + '/',
     {headers: this.httpHeaders} )
  }
  updateEvento(evento): Observable<any>{
    const body = {nome: evento.nome , desc: evento.desc , data_inicio: evento.data_inicio, data_final: evento.data_final};
    return this.http.put(this.baseurl + '/evento/' + evento.id + '/', body,
     {headers: this.httpHeaders} )
  }
  createEvento(evento): Observable<any>{
    const body = {nome: evento.nome , desc: evento.desc , data_inicio: evento.data_inicio, data_final: evento.data_final};
    return this.http.post(this.baseurl + '/evento/', body,
     {headers: this.httpHeaders} )
  }
  deleteEvento(id): Observable<any>{
    return this.http.delete(this.baseurl + '/evento/'+ id + '/',
     {headers: this.httpHeaders} )
  }
}
