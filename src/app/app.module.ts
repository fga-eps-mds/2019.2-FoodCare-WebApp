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
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { AuthService, AuthInterceptor, AuthGuard } from './auth/auth.service';
import { EventoService } from './eventos/evento.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './layout/home/home.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { CadastroComponent } from './auth/cadastro/cadastro.component';
import { EventosComponent } from './eventos/eventos.component';
import { EventosDoadorComponent } from './eventos/eventos-doador/eventos-doador.component';
import { PerfilDoadorComponent } from './perfil-doador/perfil-doador.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    CadastroComponent,
    EventosComponent,
    EventosDoadorComponent,
    PerfilDoadorComponent,
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
    OwlDateTimeModule,
    OwlNativeDateTimeModule
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
