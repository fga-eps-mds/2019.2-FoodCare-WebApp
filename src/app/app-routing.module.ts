import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { MenuNavComponent } from './menu-nav/menu-nav.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { EventosComponent } from './eventos/eventos.component';
import { MeusEventosComponent } from './meus-eventos/meus-eventos.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ExibirDoadoresComponent } from './exibir-doadores/exibir-doadores.component';
import { AuthGuard } from './auth.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'eventos', component: EventosComponent },
  { path: 'meus-eventos', component: MeusEventosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'exibir-doadores', component: ExibirDoadoresComponent, canActivate: [AuthGuard] },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
