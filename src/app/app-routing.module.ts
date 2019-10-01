import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { MenuNavComponent } from './menu-nav/menu-nav.component';
import { EventosComponent } from './eventos/eventos.component';

const routes: Routes = [
  { path: 'home', component: MenuNavComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'eventos', component: EventosComponent },
//   Sempre que criar um componente, adicioná-lo aqui
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
