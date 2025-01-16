import { Component } from '@angular/core';

@Component({
  selector: 'administration',
  templateUrl: './administration.html',
  styleUrl: './administration.css',
})
export class AdministrationComponent {
    tabGroup: "overview" | "menu" | "user" = "overview";
    toggleView(view: "overview" | "menu" | "user"){
      this.tabGroup = view;

      let cook = this.getCookie("user")
      if(cook == null)
       window.location.href="/"
    }

    usersData: any = [];
    menuData: any = [];
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
}