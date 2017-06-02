import { Component, OnInit } from '@angular/core';
import { Reservas } from '../../Reservas';
import { ReservasService } from '../services/reservas/reservas.service';

@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.css'],
  providers: [ReservasService]
})
export class CrearReservaComponent implements OnInit {

  reservations: Reservas[];

  public id: string;
  public name: string;
  public department: string;
  public quantityStudents: number;
  public floorNumber: string;
  public roomNumber: number;
  public enteredHour: string;
  public exitHour: string;
  public resDate: string;

  router;
  isActive;


  constructor(private reservaService: ReservasService) {
    this.reservaService.getReservas().subscribe(reservations => {
      this.reservations = reservations;
    });
  }

  ngOnInit() {
  }

  reservar() {
    if (this.id == undefined || this.name == undefined || this.department == undefined ||
      this.quantityStudents == undefined || this.floorNumber == undefined ||
      this.roomNumber == undefined || this.enteredHour == undefined || this.exitHour == undefined ||
      this.resDate == undefined) {
      alert("Please complete the form.");
    } else {
      var reservation = {
        "nombre": this.name,
        "id": this.id,
        "departamento": this.department,
        "cantEstudiantes": this.quantityStudents,
        "numSalon": this.roomNumber,
        "horaEntrada": this.enteredHour,
        "horaSalida": this.exitHour,
        "fecha": this.resDate,
        "Status": "Confirmar",
        "style": "btn btn-success",
        "piso": this.floorNumber
      };
      
      this.reservaService.addReserva(reservation)
        .subscribe(res => {
          this.reservations.push(res);
          console.log(this.reservations);
        });

        alert("Reservation Completed");
    }
  }

  log() {
    if (this.id == undefined || this.name == undefined || this.department == undefined ||
      this.quantityStudents == undefined || this.floorNumber == undefined ||
      this.roomNumber == undefined || this.enteredHour == undefined || this.exitHour == undefined ||
      this.resDate == undefined) {
      alert("falta algo");
    } else {
      var reservation = {
        "nombre": this.name,
        "id": this.id,
        "departamento": this.department,
        "cantEstudiantes": this.quantityStudents,
        "numSalon": this.roomNumber,
        "horaEntrada": this.enteredHour,
        "horaSalida": this.exitHour,
        "fecha": this.resDate,
        "Status": "Confirmar",
        "style": "btn btn-success"
      };

      console.log(reservation);
    }
  }
}
