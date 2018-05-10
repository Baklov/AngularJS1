import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import {  Client } from '../../models/Client';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  todolist:Client[];
  client:Client = new Client(0,"","","");

  constructor(public clientService:ClientService) { 

         console.log("I am in Clients component");
     
   }

  ngOnInit() {
    console.log("I am in Clients onInit component");
    
    this.clientService.getClients().subscribe(
     
        data => {
           console.log(data);
           this.todolist = data;
        }
      
    );

  }
    
  addClient(id:number,name:string,address:string,phone:string){
    this.client = new Client(id,name,address,phone);
     console.log("Push add button");
     console.log("-->>"+name);
     console.log("-->>"+this.client);
       this.clientService.addClients(this.client).subscribe(
     
      data => {
        debugger;
          console.log(data);
          this.todolist = data;
         
       }
    
  );

  }
  edit(id:number,name:string,address:string,phone:string){
    console.log("Push edit button");
    this.client = new Client(id,name,address,phone);
    console.log("-->>"+name);
    console.log("-->>"+this.client);
    this.clientService.editClient(this.client).subscribe(
     
      data => {
          console.log(data);
          // debugger;
          this.client = data;
          console.log(this.client.id);
          console.log(this.client.name);
          console.log(this.client.address);
          console.log(this.client.phone);
         
       }
         
    );
  }

  remove(id:number){
    console.log("Push remove button");
     console.log("-->>"+id);
    console.log("Push remove button");
    this.clientService.delClient(id).subscribe(
     
      data => {
          console.log(data);
          this.todolist = data;
         
       }
    
  );
 
  }

  updateClient(){
    
    console.log("Udate edit button");
     console.log("Push add button");
     console.log("-->>"+name);
     console.log("-->>"+this.client);
       this.clientService.updateClient(this.client).subscribe(
     
      data => {
        debugger;
          console.log(data);
          this.todolist = data;
          this.client.id=0;
          this.client.name="";
          this.client.phone="";
          this.client.address="";
         
       }
      );
  }

  

}
