import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { MenuNavComponent } from './menu-nav/menu-nav.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';


const APP_ROUTER: Routes = [
    {
        path: '',
        component: HomeComponent
    }, {
        path: 'cadastro'
        , component: CadastroComponent
    },
    {
        path: 'login'
        , component: LoginComponent
    }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTER);