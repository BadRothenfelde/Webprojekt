import { Component } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'menu',
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class MenuComponent {
  modalVisible: "log" | null = null;
  menuItem:any = [];
  order: {[key: number]: { id: number, name: String, price: number, chilliOil: boolean, chilliFlake: boolean, soySauce: boolean } } = {};
  
  orderCount = 0
  id:number = 0;
  name:String = ""
  price: number = 0
  chilli_oil: boolean = false;
  chilli_flakes: boolean = false;
  soy_sauce: boolean = false;

  isPlatFormBrowser
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isPlatFormBrowser = isPlatformBrowser(platformId);
    this.getMenue();
  }
  ngOnInit() {
    if(!this.isPlatFormBrowser) return;

    let cook = this.getCookie("order")
    if(cook != null){
      this.order = JSON.parse(cook)
      this.orderCount = Object.keys(this.order).length
    }
  }

  toggleModal(modal: 'log' | null){
      this.modalVisible = modal;
  }
  navigateToAllergy(): void{
    window.location.href = '/allergy'
  }
  addToCart(){
    this.order[this.orderCount] ={
      id: this.id,
      name: this.name,
      price: this.price,
      chilliOil: this.chilli_oil,
      chilliFlake: this.chilli_flakes,
      soySauce: this.soy_sauce
    }
      
    this.orderCount++

    this.chilli_oil = false;
    this.chilli_flakes = false;
    this.soy_sauce = false;
    let d:Date = new Date();
    d.setTime(d.getTime() + 120 * 60 * 1000);
    let expires:string = `expires=${d.toUTCString()}`;
    document.cookie = "order="+JSON.stringify(this.order)+`;${expires};path=/`
    this.toggleModal(null)
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

  getCookie(name: String) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Check if the cookie name matches
            if (cookie.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }
}