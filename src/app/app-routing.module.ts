import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.service';

import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { CadastroComponent } from './auth/cadastro/cadastro.component';
import { EventosComponent } from './eventos/eventos.component';
import { EventosDoadorComponent } from './eventos/eventos-doador/eventos-doador.component';
import { PerfilDoadorComponent } from './perfil-doador/perfil-doador.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'eventos', component: EventosComponent },
  { path: 'eventos-doador', component: EventosDoadorComponent, canActivate: [AuthGuard] },
  { path: 'perfil-doador', component: PerfilDoadorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
