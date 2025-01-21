import { Component } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
  
@Component({
  selector: 'sticky-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {
    modalVisible: "log" | null | "order" | "regist" = null;
    
    admin = false;
    logged = false;
    user = {"id": null, "name": null, "surname": null, "picture": null, "description": null, "lvl": 0};
    csrftoken: String = "";
    isPlatFormBrowser

    order: {[key: number]: { id: number,name: String, price: number, chilliOil: boolean, chilliFlake: boolean, soySauce: boolean } } = {};
    viewOrder: { id: number, name: String, price: number, chilliOil: boolean, chilliFlake: boolean, soySauce: boolean }[] = []

    constructor(@Inject(PLATFORM_ID) platformId: Object) {
      this.isPlatFormBrowser = isPlatformBrowser(platformId);
    }
    removeItem(id: number){
      for(let i = 0; i < this.viewOrder.length; i++){
        if(this.viewOrder[i].id == id){
          
        }
      }
      this.viewOrder.splice(id - 1);
    }
    ngOnInit() {
      // why this platform browser or due to change cookies error despite having read cookie
      if(!this.isPlatFormBrowser) return;

      let cook = this.getCookie("user")
      if(cook != null){
        this.user = JSON.parse(cook)
        
        if(this.user["id"] != null){
          this.logged = true

          if(this.user["lvl"] > 1)
            this.admin = true
        }
      }
    }
    
    regist = {
      id:null,
      vorname:"",
      nachname:"",
      password:"",
      beschreibung:"Kunden Nutzer",
      lvl:"1",
      profilePicture: null as File | null,
    }
    async addUser(event: Event){
      event.preventDefault()
      
      const formData = new FormData();
      formData.append('vorname', this.regist.vorname);
      formData.append('nachname', this.regist.nachname);
      formData.append('password', this.regist.password);
      formData.append('beschreibung', this.regist.beschreibung);
      formData.append('lvl', this.regist.lvl);

      if (this.regist.profilePicture) {
        formData.append('profilePicture', this.regist.profilePicture);
      }
      console.info(formData)

      let response = await fetch("http://127.0.0.1:8000/administration/registry/", {
        method: 'POST',
        body: formData
      })
      this.toggleModal(null)
    }
    selectedProfile(event: any) {
      this.regist.profilePicture = event.target.files[0];
    }
    updateOrder(){
      let cook = this.getCookie("order")
      if(cook != null){
        this.order = JSON.parse(cook)
        const orderCount = Object.keys(this.order).length
        
        if(orderCount == this.viewOrder.length)
          return;
        this.viewOrder = []
        for (let i = this.viewOrder.length; i < orderCount; i++){
          this.viewOrder.push({
            id: this.order[i].id,
            name: this.order[i].name,
            price: this.order[i].price,
            chilliOil: this.order[i].chilliOil,
            chilliFlake: this.order[i].chilliFlake,
            soySauce: this.order[i].soySauce
          })
        }
        
        console.info(this.viewOrder)
      }
    }

    toggleModal(modal: 'log' | null | "order" | "regist"){
      this.modalVisible = modal;
    }


    async verify(name: String, pass: String): Promise<any>{
 
      let response = await fetch("http://127.0.0.1:8000/administration/", {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({"name": name, "password": pass}),
        credentials: "include"
    })
    let cookie = await response.json()
    let d:Date = new Date();
    if(response.status==200){
      
      d.setTime(d.getTime() + 20 * 60 * 1000);
      let expires:string = `expires=${d.toUTCString()}`;
      this.user = cookie
      document.cookie = "user="+JSON.stringify(this.user)+`;${expires};path=/`

      this.logged = true

      if(this.user["lvl"] > 1)
        this.admin = true

      if(this.logged){
        this.toggleModal(null)
        if(this.admin) 
          window.location.href="/administration"
        else
          window.location.href="/user"
      }
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