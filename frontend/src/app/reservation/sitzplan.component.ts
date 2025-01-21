import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'appSitzplan',
  templateUrl: './reservation.html',
  styleUrls: ['./reservation.css']
})
export class SitzplanComponent implements OnInit {
  sitzplan: any[] = []; // Array zum Speichern der Sitzplan-Daten
  selectedDatum: string | null = null; // Beispieldatum
  selectedZeitfenster: string | null = null; // Beispielzeitfenster

  ngOnInit(): void {
    // this.ladeSitzplan();
  }

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
      const data = await response.json();
      // Extrahiere das "Sitzplan"-Array aus der Antwort:
      this.sitzplan = data.Sitzplan;
      console.log(this.sitzplan);
    } catch (error) {
      console.error('Fehler beim Laden des Sitzplans:', error);
      alert('Fehler beim Laden des Sitzplans.');
    }
    // this.selectedTisch.tisch.kapazitaaat = this.selectedTisch.tisch.kapazität.replace('aaa', '\u00e4');
  }

  selectedTisch: any = null; 
  isPopupOpen = false;
  isPopupOpen2 = false;
  popup2: string = '';
  popup2Message="";

  // Methode, um das Pop-up zu öffnen
  openPopup(tisch: any): void {
    this.selectedTisch = tisch;
    this.isPopupOpen = true;
  }

  openPopup2(message: string): void {
    this.popup2 = message;   // Pop-up Nachricht setzen
    this.isPopupOpen2 = true; // Pop-up 2 öffnen
  }

  // Methode, um das Pop-up zu schließen
  closePopup() {
    this.isPopupOpen = false;
    this.selectedTisch = null;
  }

  closePopup2() {
    this.isPopupOpen2 = false;
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
        const errorData = await response.json(); // Error Message aus der Antwort des Servers holen
        throw new Error(errorData.error || `HTTP-Fehler! Status: ${response.status}`); // Fehlernachricht von der Antwort verwenden
      }
// Die Antwort als JSON parsen
      const data = await response.json();

      // Buchungscode aus der Antwort extrahieren und anzeigen
      const buchungscode = data.buchungscode;  // Buchungscode aus der Antwort erhalten
      // Alle Details im Alert anzeigen
      var popup2Message = `Tisch ${tisch.tisch.tisch_id} erfolgreich gebucht!<br>
      Dein Buchungscode: ${buchungscode}<br>
      Datum: ${this.selectedDatum}<br>
      Uhrzeit: ${this.selectedZeitfenster}<br>
      Dauer: ${buchung.dauer} Minuten`;

      // alert(popup2Message);
      this.openPopup2(popup2Message);

      await this.ladeSitzplan(); // Sitzplan nach der Buchung aktualisieren
    } catch (error: any) {
    // Fehler als `any` behandeln, was Zugriff auf `message` erlaubt
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



