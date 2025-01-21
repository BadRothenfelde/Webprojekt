import { Component } from '@angular/core';

@Component({
  selector: 'user',
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class UserComponent {
    tabGroup: "overview" | "order" | "user" = "overview";
    user = {
      id:null,
      vorname:"",
      nachname:"",
      password:"",
      beschreibung:"",
      lvl:"1",
      profilePicture: null as File | null,
    }
    toggleView(view: "overview" | "order" | "user"){
      this.tabGroup = view;

      let cook = this.getCookie("user")
      if(cook == null)
       window.location.href="/"
    }
    order = []
    async removeUser(id: number){
      let response = await fetch("http://127.0.0.1:8000/administration/purge/", {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: id + ""
      })


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
  logout(){
     document.cookie = "user='';expires=-1;path=/"
     window.location.href = "/"
  }
}