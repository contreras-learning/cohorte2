import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Users } from "../model/users";

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  public url: string = 'https://randomuser.me/api?results=10&nat=es';

  constructor(private http: HttpClient) { }

  getUsersRecomendado(): Observable<Users[]> {
    return this.http.get<Users[]>(this.url);
  }

  getUsers(){
    return this.http.get(this.url);
  }
}
