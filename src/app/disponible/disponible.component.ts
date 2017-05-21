import { Component, OnInit } from '@angular/core';
import { ReservasService } from '../services/reservas/reservas.service';
import { Reservas } from '../../Reservas';

@Component({
  selector: 'app-disponible',
  templateUrl: './disponible.component.html',
  styleUrls: ['./disponible.component.css'],
  providers: [ReservasService]
})
export class DisponibleComponent implements OnInit {

  reservas: Reservas[];
  available: Object[] = [];
  dateDesired;

  admin = "Rafael E. Colon Maldonado";

  constructor(private reservasService: ReservasService) {
    //recibo las reservas para buscar a que horas hay reserva y a
    //partir de hay busco las horas en la que no hay reserva
    this.reservasService.getReservas().subscribe(reservas => {
      this.reservas = reservas;
    });
  }

  ngOnInit() { }

  search() {
    var resHour;//Toma la primera reserva que hay en la coleccion de reserva
    var nextResHour;//Toma la proxima reserva de la coleccion
    var floor = "1";
    var room = this.getFloorAndRoom(floor);
    var roomRes;
    var flag = false;
    var floorAndRoom;
    var nextFloorAndRoom;
    var primerDigito;
    var segundoDigito;
    var diff;

    for (var j = 0; j < room.length; j++) {
      roomRes = this.sortByRoom(room[j], floor);
      for (var i = 0; i < roomRes.length - 1; i++) {
        floorAndRoom = roomRes[i].piso == floor && roomRes[i].numSalon == room[j];
        nextFloorAndRoom = roomRes[i + 1].piso == floor && roomRes[i + 1].numSalon == room[j];

        if (floorAndRoom) {
          primerDigito = roomRes[i].horaSalida.charAt(0);
          segundoDigito = roomRes[i].horaSalida.charAt(1);
          console.log(primerDigito + " primero");
          console.log(segundoDigito + " segundo");

          resHour = +(primerDigito + segundoDigito);//De string los convierto a number

          console.log(resHour + "la hora" + i);
        }

        if (nextFloorAndRoom) {
          var nextPrimerDigito = roomRes[i + 1].horaEntrada.charAt(0);
          var nextSegundoDigito = roomRes[i + 1].horaEntrada.charAt(1);
          nextResHour = +(nextPrimerDigito + nextSegundoDigito);//De string los convierto a number
        }

        if (floorAndRoom == true && nextFloorAndRoom == true) {
          diff = resHour - nextResHour;
          if (diff > 0) {
            console.log(diff + " la diferencia de " + resHour + " y " + nextResHour);

            var tercerDigito = roomRes[i].horaSalida.charAt(3);//Primer minuto de la hora de salida de la reserva
            var cuartoDigito = roomRes[i].horaSalida.charAt(4);//Segundo minuto de la hora de salida de la reserva

            var nextTercerDigito = roomRes[i + 1].horaEntrada.charAt(3);//Primer minuto de la hora de entrada de la proxima reserva
            var nextCuartoDigito = roomRes[i + 1].horaEntrada.charAt(4);//Segundo minuto de la hora de entrada de la proxima reserva

            var minutosInicial = (+(tercerDigito + cuartoDigito)) + 1;
            var minutosFinal = (+(nextTercerDigito + nextCuartoDigito)) - 1;
            if (minutosInicial < 10) {
              var minutoStr = this.setInitialMinutes(minutosInicial);
              var minutoFinalStr = this.setFinalMinutes(minutosFinal);
              var timeInterval = primerDigito + segundoDigito + ":" + minutoStr + " - " +
                nextPrimerDigito + nextSegundoDigito + ":" + minutoFinalStr;
              console.log(timeInterval)
            }
            this.available.push({
              "salon": roomRes[i].numSalon,
              "piso": roomRes[i].piso,
              "content": "algo",
              "timeAvailable": timeInterval,
              "Status": "Go"
            });

          } else if (diff < 0) {
            console.log(diff)

            tercerDigito = roomRes[i].horaSalida.charAt(3);//Primer minuto de la hora de salida de la reserva
            cuartoDigito = roomRes[i].horaSalida.charAt(4);//Segundo minuto de la hora de salida de la reserva

            nextTercerDigito = roomRes[i + 1].horaEntrada.charAt(3);//Primer minuto de la hora de entrada de la proxima reserva
            nextCuartoDigito = roomRes[i + 1].horaEntrada.charAt(4);//Segundo minuto de la hora de entrada de la proxima reserva

            minutosInicial = (+(tercerDigito + cuartoDigito)) + 1;
            minutosFinal = (+(nextTercerDigito + nextCuartoDigito)) - 1;

            console.log(minutosInicial);

            if (minutosInicial < 10) {
              var minutoStr = this.setInitialMinutes(minutosInicial);
              var minutoFinalStr = this.setFinalMinutes(minutosFinal);
              var timeIntervalInical = primerDigito + segundoDigito + ":" + minutoStr;
              console.log(timeIntervalInical)
            } else {
              var timeIntervalInical = primerDigito + segundoDigito + ":" + minutosInicial;
            }
            if (minutosFinal < 0) {
              minutosFinal = minutosFinal + 60;
              var hourStr = (+(nextPrimerDigito + nextSegundoDigito)) - 1;
              var timeIntervalFinal = hourStr + ":" + minutosFinal;
            } else {
              var timeIntervalFinal = nextPrimerDigito + nextSegundoDigito + ":" + minutosFinal;
            }
            this.available.push({
              "salon": roomRes[i].numSalon,
              "piso": roomRes[i].piso,
              "content": "algo",
              "timeAvailable": (timeIntervalInical + "-" + timeIntervalFinal),
              "Status": "Go"
            });
            console.log(this.available)

          } else {
            console.log(diff + "hola");
          }
        }
      }
      if (j == room.length - 1) {
        floor = "2";
        room = this.getFloorAndRoom(floor);
        if (flag == false) {
          j = -1;
          flag = true;
        }
      }
    }
  }

  getFloorAndRoom(floor: string) {
    var floorAndRoom = {
      floor1: ["1", "2", "3", "4", "5", "6", "7"],
      floor2: ["1", "2", "3", "4", "5", "6"]
    }
    if (floor === "1") {
      return floorAndRoom.floor1;
    } else {
      return floorAndRoom.floor2;
    }
  }
  //Esta funcion recibe el arreglo de reservas y devuelve un arreglo
  //en donde estan las reservas de un salon en especifico
  sortByRoom(room: string, floor: string) {
    var resByRoom: any[] = [];
    for (var i = 0; i < this.reservas.length; i++) {
      if (this.reservas[i].numSalon === room && this.reservas[i].piso === floor && this.reservas[i].fecha === this.dateDesired) {
        resByRoom.push(this.reservas[i]);
      }
    }
    console.log(resByRoom + "salon");
    return resByRoom;
  }

  setInitialMinutes(minutoStr) {
    var minuto;
    switch (minutoStr) {
      case 0: {
        minuto = "00";
        break;
      }
      case 1: {
        minuto = "01";
        break;
      }
      case 2: {
        minuto = "02";
        break;
      }
      case 3: {
        minuto = "03";
        break;
      }
      case 4: {
        minuto = "04";
        break;
      }
      case 5: {
        minuto = "05";
        break;
      }
      case 6: {
        minuto = "06";
        break;
      }
      case 7: {
        minuto = "07";
        break;
      }
      case 8: {
        minuto = "08";
        break;
      }
      case 9: {
        minuto = "09";
        break;
      }
    }
    return minuto;
  }

  setFinalMinutes(minutoStr) {
    var minuto;
    switch (minutoStr) {
      case 0: {
        minuto = "00";
        break;
      }
      case 1: {
        minuto = "01";
        break;
      }
      case 2: {
        minuto = "02";
        break;
      }
      case 3: {
        minuto = "03";
        break;
      }
      case 4: {
        minuto = "04";
        break;
      }
      case 5: {
        minuto = "05";
        break;
      }
      case 6: {
        minuto = "06";
        break;
      }
      case 7: {
        minuto = "07";
        break;
      }
      case 8: {
        minuto = "08";
        break;
      }
      case 9: {
        minuto = "09";
        break;
      }
    }
    return minuto;
  }
}
