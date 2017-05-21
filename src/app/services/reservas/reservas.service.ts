import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ReservasService {

  constructor(private http:Http) {
    console.log("reservas obtenidas");
   }

   getReservas(){
     return this.http.get('http://localhost:3000/api/reservations')
        .map(res => res.json());
   }

   addReserva(reserva){
     console.log(reserva)
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post('http://localhost:3000/api/reservation', JSON.stringify(reserva), {headers: headers})
        .map(res => res.json());
   }

   deleteReservation(id){
     console.log('http://localhost:3000/api/reservation/'+id)
      return this.http.delete('http://localhost:3000/api/reservation/'+id)
          .map(res => res.json());
   }

}
