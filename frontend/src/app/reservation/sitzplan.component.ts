import { Component } from '@angular/core';

@Component({
  selector: 'appSitzplan',
  templateUrl: './reservation.html',
  styleUrls: ['./reservation.css']
})
export class SitzplanComponent {
  selectedDatum: string = '';
  selectedZeitfenster: string = '';
  sitzplan: any[] = [];

  // Laden des Sitzplans
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
      this.sitzplan = await response.json();
    } catch (error) {
      console.error('Fehler beim Laden des Sitzplans:', error);
      alert('Fehler beim Laden des Sitzplans.');
    }
  }

  // Tisch buchen
  async bucheTisch(tisch: any) {
    if (tisch.status === 'besetzt') {
      alert('Dieser Tisch ist bereits besetzt.');
      return;
    }

    const buchung = {
      tisch: tisch.tisch.tisch_id,
      datum: this.selectedDatum,
      zeitfenster: this.selectedZeitfenster,
      dauer: 90, // Standarddauer
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/seating/buchung/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(buchung),
      });

      if (!response.ok) {
        throw new Error(`HTTP-Fehler! Status: ${response.status}`);
      }

      alert(`Tisch ${tisch.tisch.tisch_id} erfolgreich gebucht!`);
      await this.ladeSitzplan(); // Sitzplan nach der Buchung aktualisieren
    } catch (error) {
      console.error('Fehler bei der Buchung:', error);
      alert('Fehler bei der Buchung.');
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



