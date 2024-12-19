import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'menu',
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class MenuComponent {
  modalVisible: "log" | null = null;

    toggleModal(modal: 'log' | null){
        this.modalVisible = modal;
    }
        constructor(private router: Router) {}
        navigateToAllergy(): void {
          this.router.navigate(['/allergy'])
      }
      }