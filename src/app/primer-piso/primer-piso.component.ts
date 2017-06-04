import { Component, OnInit } from '@angular/core';
import { ReservasService } from '../services/reservas/reservas.service';
import { Reservas } from '../../Reservas';

@Component({
  selector: 'app-primer-piso',
  templateUrl: './primer-piso.component.html',
  styleUrls: ['./primer-piso.component.css'],
  providers: [ReservasService]
})
export class PrimerPisoComponent {

  public reservas: Reservas[]; //arreglo que recibe la informacion de la base de datos


  admin="Rafael E. Colon Maldonado";

  reservationHeader: string[] = ["ID", "Nombre", "Hora Reservada", "Hora de Salida", "Cant. Est.", "Piso", "Salon","Fecha", "Reserva"];  


  constructor(private reservasService: ReservasService) { 
    this.reservasService.getReservas().subscribe(reservas => {
    this.reservas = reservas;
    });
  }

  setStatus(resID){ 

    var res = this.reservas;

    for(var i=0; i < this.reservas.length; i++){
      if(this.reservas[i].Status === "Confirmar" && this.reservas[i]._id === resID){
        this.reservas[i].Status = "Desalojar"
        this.reservas[i].style = "btn btn-danger";
        i = this.reservas.length;
      } else if (this.reservas[i].Status === "Desalojar" && this.reservas[i]._id === resID){
        
        this.reservasService.deleteReservation(resID).subscribe(data =>{
          if(data.n == 1){
            res.splice(i, 1);
          }
        });
      }
    }
  }
}
