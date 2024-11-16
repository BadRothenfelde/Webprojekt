import { Component } from '@angular/core';

@Component({
  selector: 'sticky-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
    modalVisible: "log" | null = null;

    toggleModal(modal: 'log' | null){
        this.modalVisible = modal;
    }
}