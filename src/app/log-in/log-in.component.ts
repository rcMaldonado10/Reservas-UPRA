import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Admin } from '../../Admin';

@Component({
  moduleId: module.id,
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  admin: Admin[];
  link: string;
  activeLink: string;

  enteredUser:string;
  enteredPass:string;

  constructor(private adminService:AdminService) {
      this.adminService.getAdmin().subscribe(guaridaAdmin => {
        this.admin = guaridaAdmin;
      });
   }


  checkInfo(){
    var i: number;
    var length = this.admin.length;
    for(i = 0; i < length; i++){
        if (this.admin[i].username == this.enteredUser && this.admin[i].password == this.enteredPass){
          console.log(this.admin[i].username);
          console.log(this.admin[i].password);

          this.link = "/app-primer-piso";
          this.activeLink = "active"

        }    
    }
  }

  /*postInfo(){

    console.log("post");
    this.adminService.postAdmin().subscribe(demoDb => {

    });
  }*/
}
