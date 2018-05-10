import { Injectable } from '@angular/core';
import {  Client } from '../models/Client';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RequestOptions, Request, RequestMethod} from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';


// import * as clientsJSON from "../models/notelists.json";

//and then using them as:


@Injectable({
  providedIn: 'root'
})
export class ClientService implements OnInit{
  todolist:Client[];
  articleUrl = "http://localhost:3000/todolist/?type=sel";
  articleUrlAdd = "http://localhost:3000/todolist/?type=ins";
  articleUrlDel = "http://localhost:3000/todolist/?type=del";
  articleUrlEdit = "http://localhost:3000/todolist/?type=edit";
  articleUrlUpdate = "http://localhost:3000/todolist/?type=update";

  getDashboard() : any {

    let results;
    const headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin','*')
      .set('Content-Type', 'application/json');

    return this.http.get(this.articleUrl);
  }
  getClients(): Observable<Client[]>{
       console.log("I am in service");
      
      // return this.http.get(this.articleUrl).pipe(
      //   map(res => res.json())
      // );

      return this.http.get(this.articleUrl).pipe(
        map(res => res.json())
      );
   
  }

  addClients(client :Client ): Observable<Client[]>{
    let articleUrlAdd: string;
    articleUrlAdd= this.articleUrlAdd;
    console.log("I am in service AddClients"+client.name);
    articleUrlAdd+="&id="+client.id+"&name="+client.name+"&address="+client.address+"&phone="+client.phone;
   console.log(articleUrlAdd);
    return this.http.get(articleUrlAdd).pipe(
     map(res => res.json())
   );
  }

  updateClient(client :Client ): Observable<Client[]>{
    let articleUrl: string;
    articleUrl= this.articleUrlUpdate;
    console.log("I am in service updateClients"+client.name);
    articleUrl+="&id="+client.id+"&name="+client.name+"&address="+client.address+"&phone="+client.phone;
   console.log(articleUrl);
    return this.http.get(articleUrl).pipe(
     map(res => res.json())
   );
  }

  delClient(id :number ): Observable<Client[]>{
    let articleUrlDel: string;
    articleUrlDel= this.articleUrlDel;
    console.log("I am in service DelClient"+id);
    articleUrlDel+="&id="+id;
   console.log(articleUrlDel);
    return this.http.get(articleUrlDel).pipe(
     map(res => res.json())
   );
  }

  editClient(client :Client ): Observable<Client>{
    let articleUrlEdit: string;
    articleUrlEdit= this.articleUrlEdit;
    console.log("I am in service EDitClient"+client.id);
    articleUrlEdit+="&id="+client.id+"&name="+client.name+"&address="+client.address+"&phone="+client.phone;
   
   console.log(articleUrlEdit);
    return this.http.get(articleUrlEdit).pipe(
     map(res => res.json())
   );
  }
  constructor(private http: Http) {
    var obj;
    // this.getJSON().subscribe(data => this.todolist=data, error => console.log(error));
}
private handleErrorObservable (error: Response | any) {
  console.error(error.message || error);
} 

ngOnInit(): void {
  console.log("Get data");


}
  
  
}



