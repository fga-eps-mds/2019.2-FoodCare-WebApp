import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { MenuNavComponent } from './menu-nav/menu-nav.component';
import { EventosComponent } from './eventos/eventos.component';
import { AdicionaEventoComponent } from './adiciona-evento/adiciona-evento.component';
import { EditaEventoComponent } from './edita-evento/edita-evento.component';

const routes: Routes = [
  { path: 'home', component: MenuNavComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'eventos', component: EventosComponent },
  { path: 'eventos/adiciona-evento', component: AdicionaEventoComponent},
  { path: 'eventos/edita-evento', component: EditaEventoComponent},
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
