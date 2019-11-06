import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { OrderModule } from 'ngx-order-pipe';

import { AuthService, AuthInterceptor, AuthGuard } from './auth/auth.service';
import { EventoService } from './eventos/evento.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ConteudoComponent } from './home/conteudo/conteudo.component';
import { RodapeComponent } from './layout/rodape/rodape.component';
import { MenuNavComponent } from './layout/menu-nav/menu-nav.component';
import { LoginComponent } from './auth/login/login.component';
import { CadastroComponent } from './auth/cadastro/cadastro.component';
import { EventosComponent } from './eventos/eventos.component';
import { EventosDoadorComponent } from './eventos/eventos-doador/eventos-doador.component';
import { ListaComponent } from './eventos/lista/lista.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConteudoComponent,
    RodapeComponent,
    MenuNavComponent,
    LoginComponent,
    CadastroComponent,
    EventosComponent,
    EventosDoadorComponent,
    ListaComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    MatStepperModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    AppRoutingModule,
    FilterPipeModule,
    OrderModule,
  ],
  providers: [
    AuthService,
    EventoService,
    AuthGuard, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
