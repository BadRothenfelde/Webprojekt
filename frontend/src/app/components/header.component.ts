import { Component } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

  
@Component({
  selector: 'sticky-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {
    modalVisible: "log" | null = null;
    
    admin = false;
    logged = false;
    user = {"id": null, "name": null, "surname": null, "picture": null, "description": null, "lvl": 0};
    isPlatFormBrowser
    constructor(@Inject(PLATFORM_ID) platformId: Object) {
      this.isPlatFormBrowser = isPlatformBrowser(platformId);
    }
    ngOnInit() {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      // why this platform browser or due to change cookies error despite having read cookie
      if(!this.isPlatFormBrowser) return;

      let cook = this.getCookie("user")
      if(cook != null){
        this.user = JSON.parse(cook)
        
        if(this.user["id"] != null){
          this.logged = true

          if(this.user["lvl"] > 1)
            this.admin = true
          console.info(this.user)
        }
      }
    }
    


    toggleModal(modal: 'log' | null){
      this.modalVisible = modal;
    }


    async verify(name: String, pass: String): Promise<any>{
      // Retrieve CSRF token from the cookie
      const csrfToken = this.getCookie('csrftoken');

      // Prepare the headers object
      const headers: HeadersInit = {
          'Content-Type': 'application/json'
      };

     //  Only add the CSRF token if it's not null
      /*if (csrfToken) {
          headers['X-CSRFToken'] = csrfToken;
      } else {
          console.error("CSRF token is missing or invalid.");
      }*/

      let response = await fetch("http://127.0.0.1:8000/administration/", {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({"name": name, "password": pass})
    })
    
    if(response.ok)
      this.user = await response.json()
      
      document.cookie = "user="+JSON.stringify(this.user)
      console.info(document.cookie)
      this.logged = true

      if(this.user["lvl"] > 1)
        this.admin = true
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