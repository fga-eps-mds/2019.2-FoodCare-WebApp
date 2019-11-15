import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient, HttpInterceptor, HttpHeaders, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import * as moment from 'moment';
import * as jwtDecode from 'jwt-decode';

import { environment } from 'src/environments/environment';
import { Doador } from './doador';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authApi = environment.apiURL + 'auth/';
  // private userApi = environment.apiURL + 'usuario/';
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  private setSession(authResult) {
    const token = authResult.token;
    const payload = <JWTPayload>jwtDecode(token);
    const expiresAt = moment.unix(payload.exp);

    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('id_doador', authResult.user.pk)
  }

  get token(): string {
    return localStorage.getItem('token');
  }

  // getDoadorID() {
  //   return localStorage.getItem('id_doador');
  // }
  // getDoador(id) {
  //   return this.http.get(this.userApi.concat(id + '/'))
  //     .subscribe(
  //       data => console.log(data),
  //       err => console.log(err)
  //     );
  // }

  login(username: string, password: string) {
    this.logout();
    return this.http.post(
      this.authApi.concat('login/'),
      { username, password }
      ).pipe(
        tap(response => {
          this.setSession(response);
      }),
      shareReplay(),
    );
  }
  cadastrar(username: string, email: string, password1: string, password2: string) {
    this.logout();
    return this.http.post(
      this.authApi.concat('signup/'),
      { username, email, password1, password2 }
    ).pipe(
      tap(response => {
        console.log(response),
        this.setSession(response)
      }),
      shareReplay(),
    );
  }
  usuarioLogado(): Observable<any> {
    return this.http.get(
      this.authApi + 'user/',
      { headers: this.httpHeaders }
    )
  }


  atualizaDoador(doador: Doador) {
    return this.http.put<any>(`${this.authApi}user/`, doador)
    .pipe(
      tap(response => {
        console.log(response)
      }),
      shareReplay(),
    );
  }
  
  deletaDoador(doador: Doador) {
    return this.http.delete<any>(`${this.authApi}user/`, doador)
    .pipe(
      tap(response => {
        console.log(response)
      }),
      shareReplay(),
    );
  }

  atualizaSenhaDoador(new_password1: String, new_password2: String) {
    return this.http.post<any>(`${this.authApi}password/change/`, {new_password1, new_password2})
    .pipe(
      tap(response => {
        console.log(response)
      }),
      shareReplay(),
    );
  }



  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    console.log('saindo');
  }
  refreshToken() {
    if (moment().isBetween(this.getExpiration().subtract(1, 'days'), this.getExpiration())) {
      return this.http.post(
        this.authApi.concat('refresh-token/'),
        { token: this.token }
      ).pipe(
        tap(response => this.setSession(response)),
        shareReplay(),
      ).subscribe();
    }
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);

    return moment(expiresAt);
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

}


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'JWT '.concat(token))
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      this.authService.refreshToken();
      return true;
    } else {
      this.authService.logout();
      this.router.navigate(['login']);
      return false;
    }
  }
}

interface JWTPayload {
  id: number;
  nome: string;
  email: string;
  exp: number;
}
