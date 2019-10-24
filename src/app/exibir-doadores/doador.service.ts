import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoadorService {
  private apiRoot = environment.apiURL;

  constructor(private http: HttpClient) { }

  getDoadores() {
    return this.http.get(this.apiRoot.concat('doadores/'));
  }

  createDoador(nome: string, cnpj: string, email: string, password: string) {
    return this.http.post(this.apiRoot.concat('doadores/'),
      {
        nome, cnpj, email, password
      }
    );
  }

  deleteDoador(id: number) {
    return this.http.delete(this.apiRoot.concat(`doadores/${id}/`));
  }

}
