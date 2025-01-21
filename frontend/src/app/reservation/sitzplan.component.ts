import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'appSitzplan',
  templateUrl: './reservation.html',
  styleUrls: ['./reservation.css']
})
export class SitzplanComponent implements OnInit {
  sitzplan: any[] = []; 
  selectedDatum: string | null = null; 
  selectedZeitfenster: string | null = null; 
  isSitzplanVisible: boolean = false; 

  ngOnInit(): void {
    // this.ladeSitzplan();
  }


  async ladeSitzplan() {
    if (!this.selectedDatum || !this.selectedZeitfenster) {
      alert('Bitte wähle Datum und Zeitfenster aus.');
      return;
    }

    const params = new URLSearchParams({
      datum: this.selectedDatum,
      zeitfenster: this.selectedZeitfenster,
    });

    try {
      const response = await fetch(`http://127.0.0.1:8000/seating/sitzplan/?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`HTTP-Fehler! Status: ${response.status}`);
      }
      const data = await response.json();
      
      this.sitzplan = data.Sitzplan;
      console.log(this.sitzplan);

      this.isSitzplanVisible = true; 
    } catch (error) {
      console.error('Fehler beim Laden des Sitzplans:', error);
      alert('Fehler beim Laden des Sitzplans.');
    }
  }

  selectedTisch: any = null; 
  isPopupOpen = false;
  isPopupOpen2 = false;
  popup2: string = '';
  popup2Message = "";

  
  openPopup(tisch: any): void {
    this.selectedTisch = tisch;
    this.isPopupOpen = true;
  }

  openPopup2(message: string): void {
    this.popup2 = message;   
    this.isPopupOpen2 = true;
  }


  closePopup() {
    this.isPopupOpen = false;
    this.selectedTisch = null;
  }

  closePopup2() {
    this.isPopupOpen2 = false;
  }


  async bucheTisch(tisch: any) {
    if (tisch.status === 'besetzt') {
      alert('Dieser Tisch ist bereits besetzt.');
      return;
    }

    const buchung = {
      tisch: tisch.tisch.tisch_id,
      datum: this.selectedDatum,
      zeitfenster: this.selectedZeitfenster,
      dauer: 90, 
    };

    console.log(buchung);

    try {
      const response = await fetch('http://127.0.0.1:8000/seating/buchung/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(buchung),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP-Fehler! Status: ${response.status}`);
      }

      const data = await response.json();
      const buchungscode = data.buchungscode;  

      var popup2Message = `Tisch ${tisch.tisch.tisch_id} erfolgreich gebucht!<br>
      Dein Buchungscode: ${buchungscode}<br>
      Datum: ${this.selectedDatum}<br>
      Uhrzeit: ${this.selectedZeitfenster}<br>
      Dauer: ${buchung.dauer} Minuten`;

      this.openPopup2(popup2Message);

      await this.ladeSitzplan();
    } catch (error: any) {
      console.error('Fehler bei der Buchung:', error);
      alert(`Fehler bei der Buchung: ${error.message}`);
    }
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@NgModule({
  declarations: [SitzplanComponent],
  exports: [SitzplanComponent],
  imports: [CommonModule, FormsModule]
})
export class SitzplanModul {}
