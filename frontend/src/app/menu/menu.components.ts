import { Component } from '@angular/core';

@Component({
  selector: 'menu',
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class MenuComponent {
  modalVisible: "log" | null = null;
  menuItem:any = [];
  
  constructor(){
    this.getMenue();
  }
  toggleModal(modal: 'log' | null){
      this.modalVisible = modal;
  }
  navigateToAllergy(): void{
    window.location.href = '/allergy'
  }

  async getMenue(): Promise<any>{
    try{
      let response = await fetch("http://127.0.0.1:8000/menue/", {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
      })
      
      if(response.ok)
        this.menuItem = (await response.json()).Haupt
      else 
        console.error(`Request failed with status ${response.status}`);
    }catch (error) {
      console.error("Network error or other issue", error);
    }
  }
}