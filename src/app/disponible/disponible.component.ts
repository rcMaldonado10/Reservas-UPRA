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

  //La funcion search() esta hecha para buscar los espacios disponibles en una reserva 
  //que este hecha, esta compara la hora de salida de una y la hora de entrada de la
  //otra para ver si hay una diferencia, ya que si la hay entonces hay un espacio
  //disponible en estas reservas. De no haber una reserva entonces indica que esta
  //disponible desde el "startingLimit" y el "endingLimit".

  search() {
    var resHour;//Toma la primera reserva que hay en la coleccion de reserva
    var nextResHour;//Toma la proxima reserva de la coleccion
    var floor = "1";//Indica el piso en el que estamos
    var room = this.getFloorAndRoom(floor); //Devuelve cuantos salones hay dependiendo de el piso
    var roomRes;//Recibe un arreglo en donde el piso, el salon y la fecha de reservas es el mismo
    var flag = false;
    var floorAndRoom;
    var nextFloorAndRoom;
    var primerDigito;//obtiene el primer digito de la primera reserva en el arreglo
    var segundoDigito;//obtiene el segundo digito de la primer reserva en el arreglo
    var diff;//Diferencia de las reservas, si hay diferencia entonces hay un tiempo disponible
    var startingLimit = "8:00";//Limite en donde empiezan las reservas
    var endingLimit = "21:00";//Limite en donde terminan las reservas

    for (var j = 0; j < room.length; j++) {
      roomRes = this.sortByRoom(room[j], floor);
      if (roomRes[j] == undefined) {
       // console.log("nada");
        this.available.push({
          "salon": room[j],
          "piso": floor,
          "content": "algo",
          "timeAvailable": startingLimit + " - " + endingLimit,
          "Status": "Crear"
        });
      }
      for (var i = 0; i < roomRes.length - 1; i++) {
        //En estas dos lineas de codigo verifico que el piso y el salon de una reserva sea el mismo
        //para entonces tomar las reservas de eso salones
        floorAndRoom = roomRes[i].piso == floor && roomRes[i].numSalon == room[j];
        nextFloorAndRoom = roomRes[i + 1].piso == floor && roomRes[i + 1].numSalon == room[j];

        if (floorAndRoom) {
          primerDigito = roomRes[i].horaSalida.charAt(0);//Tomo el primer digito de la hora
          segundoDigito = roomRes[i].horaSalida.charAt(1);//Tomo el segundo digita de la hora

          //resHour toma la hora de salida de una reserva para entonces compararla
          //con la hora de la proxima reserva
          resHour = +(primerDigito + segundoDigito);//De string los convierto a number
        }

        if (nextFloorAndRoom) {
          var nextPrimerDigito = roomRes[i + 1].horaEntrada.charAt(0);
          var nextSegundoDigito = roomRes[i + 1].horaEntrada.charAt(1);
          nextResHour = +(nextPrimerDigito + nextSegundoDigito);//De string los convierto a number
        }

        if (floorAndRoom == true && nextFloorAndRoom == true) {
          diff = resHour - nextResHour;
          if (diff > 0) {
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
              "Status": "Crear"
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
              "Status": "Crear"
            });
            console.log(this.available)
          } else {
            //console.log(diff + "hola");
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
                nextPrimerDigito + nextSegundoDigito + ":" + minutosFinal;
              console.log(timeInterval)
            } else {
               var timeInterval = primerDigito + segundoDigito + ":" + minutosInicial + " - " +
                nextPrimerDigito + nextSegundoDigito + ":" + minutosFinal;
            }
            this.available.push({
              "salon": roomRes[i].numSalon,
              "piso": roomRes[i].piso,
              "content": "algo",
              "timeAvailable": timeInterval,
              "Status": "Crear"
            });
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

  //Esta funcion recibe el piso en el que se este buscando reservas
  //y devuelve la cantidad de salones de estudio que hay en ese piso
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
  //Esta funcion recibe el arreglo de reservas y crea un arreglo
  //en donde estan las reservas de un salon en especifico. Luego
  //organiza las reservas por la hora, es decir, de reservas que son
  //en la mañana hasta por la noche
  sortByRoom(room: string, floor: string) {
    var resByRoom: any[] = [];
    let firstResHour: number;//Recive la hora de la reserva en el arreglo
    let nextFirstResHour: number;//Recive la hora de la siguiente reserva
    let minutesRes: number;//Los minutos de la primera reserva
    let nextMinutesRes: number;//los minutos de la segunda reserva
    var diffHours: number;
    var diffMinutes: number;
    for (var i = 0; i < this.reservas.length; i++) {
      if (this.reservas[i].numSalon === room && this.reservas[i].piso === floor && this.reservas[i].fecha === this.dateDesired) {
        resByRoom.push(this.reservas[i]);
      }
    }
    if (resByRoom != []) {
      while (true) {
        let swapped = false
        for (var j = 0; j < resByRoom.length - 1; j++) {
          firstResHour = +(resByRoom[j].horaSalida.charAt(0) + resByRoom[j].horaSalida.charAt(1));
          nextFirstResHour = +(resByRoom[j + 1].horaEntrada.charAt(0) + resByRoom[j + 1].horaEntrada.charAt(1));
          diffHours = firstResHour - nextFirstResHour;
          if (diffHours > 0) {
            [resByRoom[j], resByRoom[j + 1]] = [resByRoom[j + 1], resByRoom[j]];
            swapped = true;
          } else if (diffHours == 0) {
            minutesRes = +(resByRoom[j].horaSalida.charAt(3) + resByRoom[j].horaSalida.charAt(4));
            nextMinutesRes = +(resByRoom[j + 1].horaEntrada.charAt(3) + resByRoom[j + 1].horaEntrada.charAt(4));
            diffMinutes = minutesRes - nextMinutesRes;
            console.log(diffMinutes + "minutos");
            if (diffMinutes > 0) {
              [resByRoom[j], resByRoom[j + 1]] = [resByRoom[j + 1], resByRoom[j]];
              swapped = true;
            }
          }
        }
        if (!swapped) break;
      }
    }
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
