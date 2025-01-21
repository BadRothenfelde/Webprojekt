import { Component } from '@angular/core';

@Component({
  selector: 'administration',
  templateUrl: './administration.html',
  styleUrl: './administration.css',
})
export class AdministrationComponent {
    tabGroup: "overview" | "menu" | "user" | "seating" = "overview";
    tabModal: "regist" | "addItem" | null = null;
    toggleModal(view: "regist" | "addItem" | null){
      this.tabModal = view;

      let cook = this.getCookie("user")
      if(cook == null)
       window.location.href="/"
    }
    toggleView(view: "overview" | "menu" | "user" | "seating"){
      this.tabGroup = view;

      let cook = this.getCookie("user")
      if(cook == null)
       window.location.href="/"
    }

    usersData: any = [];
    menuData: any = [];
    seatingData: any = [];
    async getMenue(): Promise<any>{
      try{
        let response = await fetch("http://127.0.0.1:8000/menue/", {
          headers: {'Content-Type': 'application/json'},
          method: 'GET'
        })
        
        if(response.ok)
          this.menuData = (await response.json()).Haupt
        else 
          console.error(`Request failed with status ${response.status}`);
      }catch (error) {
        console.error("Network error or other issue", error);
      }
    }
    async getUsers(): Promise<any>{
      try{
        let response = await fetch("http://127.0.0.1:8000/administration/users/", {
          headers: {'Content-Type': 'application/json'},
          method: 'POST',
          body: this.getCookie("user")
        })
        
        if(response.ok)
          this.usersData = (await response.json()).user
        
        else 
          console.error(`Request failed with status ${response.status}`);
      }catch (error) {
        console.error("Network error or other issue", error);
      }
    }
    
    async removeUser(id: number){
      let response = await fetch("http://127.0.0.1:8000/administration/purge/", {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: id + ""
      })
      this.getUsers()
    }
    async removeItem(id: number){
      let response = await fetch("http://127.0.0.1:8000/menue/removeItem/", {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: id + ""
      })
      this.getMenue()
    }

    menue = {
      id: null,
      name:"",
      price:"",
      description:"",
      allergies:"",
      image: null as File | null,
    }
    async changeMenu(){
      const formData = new FormData();
      formData.append('id', this.menue.id + "");
      formData.append('name', this.menue.name);
      formData.append('price', this.menue.price);
      formData.append('description', this.menue.description);
      formData.append('allergies', this.menue.allergies);

      if (this.menue.image) {
        formData.append('image', this.menue.image);
      }

      let response = await fetch("http://127.0.0.1:8000/menue/adjustMenu/", {
        method: 'POST',
        body: formData
      })
      this.getMenue()
      this.cancelChangeMenu()
    }
    chooseChangeMenu(id: number){
      for (let menu of this.menuData){
        if (menu.id === id) {
          this.menue = menu;
          break;
        }
      }
      console.info(this.menue)
    }
    cancelChangeMenu(){
      this.menue = {
        id: null,
        name:"",
        price:"",
        description:"",
        allergies:"",
        image: null as File | null,
      }
    }
    async addMenu(event: Event){
      event.preventDefault()
      
      const formData = new FormData();
      formData.append('name', this.menue.name);
      formData.append('price', this.menue.price);
      formData.append('description', this.menue.description);
      formData.append('allergies', this.menue.allergies);

      if (this.menue.image) {
        formData.append('image', this.menue.image);
      }

      let response = await fetch("http://127.0.0.1:8000/menue/newItem/", {
        method: 'POST',
        body: formData
      })
      this.toggleModal(null)
      this.getMenue()
    }
    selectedImage(event: any) {
      this.menue.image = event.target.files[0];
    }

    user = {
      id:null,
      vorname:"",
      nachname:"",
      password:"",
      beschreibung:"",
      lvl:"1",
      profilePicture: null as File | null,
    }
    async changeUser(){
      const formData = new FormData();
      formData.append('id', this.user.id + "");
      formData.append('vorname', this.user.vorname);
      formData.append('nachname', this.user.nachname);
      formData.append('password', this.user.password);
      formData.append('beschreibung', this.user.beschreibung);
      formData.append('lvl', this.user.lvl);

      if (this.user.profilePicture) {
        formData.append('profilePicture', this.user.profilePicture);
      }

      let response = await fetch("http://127.0.0.1:8000/administration/adjust/", {
        method: 'POST',
        body: formData
      })
      this.getUsers()
      this.cancelChangeUser()
    }
    chooseChangeUser(id: number){
      for (let user of this.usersData){
        if (user.id === id) {
          this.user = user;
          break;
        }
      }
    }
    cancelChangeUser(){
      this.user = {id:null,
        vorname:"",
        nachname:"",
        password:"",
        beschreibung:"",
        lvl:"",
        profilePicture: null as File | null,
      }
    }
    async addUser(event: Event){
      event.preventDefault()
      
      const formData = new FormData();
      formData.append('vorname', this.user.vorname);
      formData.append('nachname', this.user.nachname);
      formData.append('password', this.user.password);
      formData.append('beschreibung', this.user.beschreibung);
      formData.append('lvl', this.user.lvl);

      if (this.user.profilePicture) {
        formData.append('profilePicture', this.user.profilePicture);
      }

      let response = await fetch("http://127.0.0.1:8000/administration/registry/", {
        method: 'POST',
        body: formData
      })
      this.toggleModal(null)
      this.getUsers()
    }
    selectedProfile(event: any) {
      this.user.profilePicture = event.target.files[0];
    }
    getCookie(name: String) {
      let cookieValue = null;
      if (typeof document === 'undefined') {
        return null; // Server-side context, document is not available
      }
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
 
  reservation = {
    id:null,
    tisch:"",
    datum:"",
    zeitfenster:"",
    dauer:"",
    buchungscode:"",
  }
  async getSeating(): Promise<any>{
    try{
      let response = await fetch("http://127.0.0.1:8000/seating/reserverations/")
      
      if(response.ok)
        this.seatingData = (await response.json()).reservation
      
      else 
        console.error(`Request failed with status ${response.status}`);
    }catch (error) {
      console.error("Network error or other issue", error);
    }
  }
  async changeReservation(){
    const formData = new FormData();
    formData.append('id', this.reservation.id + "");
    formData.append('tisch', this.reservation.tisch);
    formData.append('datum', this.reservation.datum);
    formData.append('zeitfenster', this.reservation.zeitfenster);
    formData.append('dauer', this.reservation.dauer);
    formData.append('buchungscode', this.reservation.buchungscode);

    let response = await fetch("http://127.0.0.1:8000/seating/adjust/", {
      method: 'POST',
      body: formData
    })
    this.getSeating()
    this.cancelChangeReservation()
  }
  chooseChangeReservation(id: number){
    for (let seating of this.seatingData){
      if (seating.id === id) {
        this.reservation = seating;
        break;
      }
    }
  }
  cancelChangeReservation(){
    this.reservation = {
      id:null,
      tisch:"",
      datum:"",
      zeitfenster:"",
      dauer:"",
      buchungscode:"",
    }
  }
  async removeReservation(id: number){
    let response = await fetch("http://127.0.0.1:8000/seating/purge/", {
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      body: id + ""
    })
    this.getSeating()
  }
  logout(){
     document.cookie = "user='';expires=-1;path=/"
     window.location.href = "/"
  }
}