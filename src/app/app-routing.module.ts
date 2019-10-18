import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { MenuNavComponent } from './menu-nav/menu-nav.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ExibirDoadoresComponent } from './exibir-doadores/exibir-doadores.component';
import { AuthGuard } from './auth.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cadastro', component: CadastroComponent },
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
