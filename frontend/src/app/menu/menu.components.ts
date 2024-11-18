import { Component } from '@angular/core';

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
}