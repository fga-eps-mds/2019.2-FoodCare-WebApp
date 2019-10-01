import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ExibirDoadoresComponent } from './exibir-doadores/exibir-doadores.component'
import { AuthGuard } from './auth.service';

const APP_ROUTER: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'cadastro'
        , component: CadastroComponent
    },
    {
        path: 'login'
        , component: LoginComponent
    },
    {
        path: 'exibir-doadores',
        component: ExibirDoadoresComponent,
        canActivate:[AuthGuard]
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTER);