import { Component } from '@angular/core';
import { GeneralService } from "../services/general.service";
import { Users } from "../model/users";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  users: any[] = [];  

  constructor(private services: GeneralService) {}

  ngOnInit(){
    this.services.getUsers().subscribe((users)=>{
      this.users = <any[]> users['results'];
    })
  }

}
