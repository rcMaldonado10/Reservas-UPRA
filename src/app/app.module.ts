//import de librerias
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router';

//import de componentes
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { PrimerPisoComponent } from './primer-piso/primer-piso.component';
import { CrearReservaComponent } from './crear-reserva/crear-reserva.component';
import { DisponibleComponent } from './disponible/disponible.component';

//import de los Pipes
import { FilterIDPipe } from './filter-id.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    PrimerPisoComponent,
    CrearReservaComponent,
    DisponibleComponent,
    FilterIDPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path: '', component: LogInComponent},
      {path: 'app-primer-piso', component: PrimerPisoComponent},
      {path: 'app-crear-reserva', component: CrearReservaComponent},
      {path: 'app-disponible', component: DisponibleComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
